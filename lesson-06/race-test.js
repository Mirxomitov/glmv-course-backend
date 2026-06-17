// Race condition demo: two users buy a 1-seat course at the same time.
// Run with the server already running:  node race-test.js
const BASE = "http://localhost:3000";

async function post(path, body) {
  const res = await fetch(BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: res.status, body: await res.json() };
}

async function main() {
  // 1-seat course
  const course = await post("/courses", {
    title: "React Native Bootcamp",
    price: 50000,
    seatsLeft: 1,
  });
  const courseId = course.body.data.id;

  // two users with enough balance
  const u1 = await post("/users", { fullName: "User One", balance: 100000 });
  const u2 = await post("/users", { fullName: "User Two", balance: 100000 });
  const userId1 = u1.body.data.id;
  const userId2 = u2.body.data.id;

  console.log(`Course ${courseId} created with seatsLeft = 1\n`);

  // Fire BOTH buy requests at the same time (no await between them).
  const [r1, r2] = await Promise.all([
    post(`/courses/${courseId}/buy`, { userId: userId1 }),
    post(`/courses/${courseId}/buy`, { userId: userId2 }),
  ]);

  console.log("User One buy ->", r1.status, JSON.stringify(r1.body));
  console.log("User Two buy ->", r2.status, JSON.stringify(r2.body));

  const successes = [r1, r2].filter((r) => r.status === 201).length;
  console.log(`\nSuccessful purchases: ${successes} (expected: 1)`);
  if (successes > 1) {
    console.log(">>> RACE CONDITION: the course was OVERSOLD!");
  } else {
    console.log(">>> No oversell this run (try again — races are timing-dependent).");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
