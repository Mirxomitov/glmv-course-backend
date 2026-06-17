const { createCourseService, buyCourseService } = require("./courses.service");
const { parseObjectId } = require("../shared/db/object-id");

async function createCourseController(req, res, next) {
  try {
    const { title, price, seatsLeft } = req.body;

    const course = await createCourseService({ title, price, seatsLeft });
    return res.status(201).json({ message: "ok", data: course });
  } catch (error) {
    return next(error);
  }
}

async function buyCourseController(req, res, next) {
  try {
    const courseId = parseObjectId(req.params.courseId, "course id");
    const userId = parseObjectId(req.body.userId, "user id");

    const order = await buyCourseService({ courseId, userId });
    return res.status(201).json({ message: "ok", data: order });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createCourseController,
  buyCourseController,
};
