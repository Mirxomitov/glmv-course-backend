const mongoose = require("mongoose");

const Course = require("./courses.model");
const User = require("../users/users.model");
const Order = require("../orders/orders.model");
const { HttpError } = require("../shared/errors/http-error");

async function createCourseService({ title, price, seatsLeft }) {
  if (!title) throw HttpError.badRequest("title is required");

  return Course.create({ title, price, seatsLeft });
}

// SIMPLE (UNSAFE) version — kept for comparison only.
// Read -> check -> write in separate steps. Two parallel requests can both
// read seatsLeft = 1 before either writes 0, so both succeed (oversell).
async function buyCourseServiceUnsafe({ courseId, userId }) {
  const user = await User.findById(userId);
  if (!user) throw HttpError.notFound("User not found");

  const course = await Course.findById(courseId);
  if (!course) throw HttpError.notFound("Course not found");

  if (user.balance < course.price) {
    throw HttpError.badRequest("Insufficient balance");
  }
  if (course.seatsLeft <= 0) {
    throw HttpError.conflict("No seats left");
  }

  user.balance -= course.price;
  await user.save();

  course.seatsLeft -= 1;
  await course.save();

  return Order.create({
    userId: user.id,
    courseId: course.id,
    price: course.price,
  });
}

// SAFE version — transaction + atomic conditional updates.
//
// Two ideas working together:
//   1. ATOMIC UPDATES: instead of "read then write", we tell MongoDB to
//      decrement ONLY IF the condition still holds (seatsLeft > 0, balance
//      >= price). The check and the write happen as one indivisible step, so
//      two parallel requests can't both pass the check on the last seat.
//   2. TRANSACTION: balance change + seat change + order creation either ALL
//      commit together or ALL roll back. No half-finished purchases.
async function buyCourseService({ courseId, userId }) {
  const session = await mongoose.startSession();
  try {
    let order;

    // withTransaction runs the callback inside a transaction and automatically
    // retries it if MongoDB reports a transient write-conflict.
    await session.withTransaction(async () => {
      // Make sure the course exists (and read its price) inside the transaction.
      const course = await Course.findById(courseId).session(session);
      if (!course) throw HttpError.notFound("Course not found");

      // 1. Take a seat atomically: only matches if a seat is still available.
      const seatTaken = await Course.findOneAndUpdate(
        { _id: courseId, seatsLeft: { $gt: 0 } },
        { $inc: { seatsLeft: -1 } },
        { new: true, session }
      );
      if (!seatTaken) throw HttpError.conflict("No seats left");

      // 2. Charge the user atomically: only matches if balance is enough.
      const charged = await User.findOneAndUpdate(
        { _id: userId, balance: { $gte: course.price } },
        { $inc: { balance: -course.price } },
        { new: true, session }
      );
      if (!charged) {
        // Either the user doesn't exist or can't afford it. Tell them apart
        // so the error message is accurate. Throwing rolls back the seat too.
        const user = await User.findById(userId).session(session);
        if (!user) throw HttpError.notFound("User not found");
        throw HttpError.badRequest("Insufficient balance");
      }

      // 3. Record the order. create() with a session needs the array form.
      const created = await Order.create(
        [{ userId, courseId, price: course.price }],
        { session }
      );
      order = created[0];
    });

    return order;
  } finally {
    // Always release the session, whether the transaction committed or aborted.
    await session.endSession();
  }
}

module.exports = {
  createCourseService,
  buyCourseService,
  buyCourseServiceUnsafe,
};
