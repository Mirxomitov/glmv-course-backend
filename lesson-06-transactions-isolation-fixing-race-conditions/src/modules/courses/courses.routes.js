const express = require("express");

const {
  createCourseController,
  buyCourseController,
} = require("./courses.controller");

const router = express.Router();

router.post("/courses", createCourseController);
router.post("/courses/:courseId/buy", buyCourseController);

module.exports = router;
