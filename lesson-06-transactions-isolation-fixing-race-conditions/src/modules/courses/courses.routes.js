const express = require("express");

const {
  createCourseController,
  listCoursesController,
  buyCourseController,
} = require("./courses.controller");

const router = express.Router();

router.post("/courses", createCourseController);
router.get("/courses", listCoursesController);
router.post("/courses/:courseId/buy", buyCourseController);

module.exports = router;
