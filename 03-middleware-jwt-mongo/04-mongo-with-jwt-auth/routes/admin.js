const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const router = Router();
const jwtPassword = "SecretToken@23#Mastan";

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  // const body = JSON.parse(req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    return;
  }

  const newAdmin = new Admin({
    username: username,
    password: password,
  });

  newAdmin
    .save()
    .then((result) => {
      console.log(`document-admin saved successfully. ${result}`);
      res.status(200).json({ message: "Admin created succesfully" });
    })
    .catch((err) => {
      console.log(
        `Error occured while saving the document-Admin. error : ${err}`
      );
      res
        .status(404)
        .json({ message: "Error occured while creating the document-Admin" });
    });
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;

  Admin.find({ username: username, password: password }).then((resp) => {
    if (resp.length > 0) {
      const token = jwt.sign({ username: username }, jwtPassword);
      res.status(200).json({ token: token });
    } else {
      res.status(404).json({ message: "Invalid Admin." });
    }
  });
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic

  const {
    title: i_title,
    description: i_description,
    price: i_price,
    imageLink: i_imageLink,
  } = req.body;

  const newCourse = new Course({
    title: i_title,
    description: i_description,
    price: i_price,
    imageLink: i_imageLink,
    published: true,
  });

  newCourse
    .save()
    .then((response) => {
      console.log(`Document-Course saved successfully. ${response}`);
      res.status(200).json({
        message: "Course created successfully",
        courseId: response._id,
      });
    })
    .catch((err) => {
      console.log(`Error occured while saving the document-Course : ${err}`);
      res
        .status(404)
        .json({ message: "Error occured while saving the document-course" });
    });
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
  Course.find({})
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: `Error occured while getting the courses ${err}` });
    });
});

module.exports = router;
