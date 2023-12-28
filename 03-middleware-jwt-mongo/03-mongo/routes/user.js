const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;

  if (!username || !password) {
    return;
  }

  const newUser = new User({
    username: username,
    password: password,
  });

  newUser
    .save()
    .then((result) => {
      console.log(`document-user saved successfully. ${result}`);
      res.status(200).json({ message: "User created succesfully" });
    })
    .catch((err) => {
      console.log(
        `Error occured while saving the document-user. error : ${err}`
      );
      res
        .status(404)
        .json({ message: "Error occured while creating the document-user" });
    });
});

router.get("/courses", userMiddleware, (req, res) => {
  // Implement listing all courses logic
  Course.find({})
    .then((resp) => {
      res.status(200).send(resp);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "Error occured while getting the courses" });
    });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const { username, password } = req.headers;
  Course.findOne({ _id: courseId })
    .then((course) => {
      if (course) {
        User.findOne({ username: username, password: password }).then(
          (user) => {
            if (user) {
              user.purchasedCourses.push(course);
              user
                .save()
                .then((res) => console.log(`course saved successfully`));
              res
                .status(200)
                .json({ message: "Course purchased successfully" });
            }
          }
        );
      }
      res.status(404).json({ message: "Course not found." });
    })
    .catch((error) => {
      console.log(`Error occured while purchasing the course : ${error}`);
      res
        .status(404)
        .json({ message: "Error occured while purchasing the course" });
    });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
  const { username, password } = req.headers;
  User.findOne({ username: username, password: password })
    .then((user) => {
      if (user) {
        res.status(200).json({ purchasedCourses: user.purchasedCourses });
      }
    })
    .catch((error) =>
      res.status(404).json({
        message: `Error occured while getting purchased courses for the user. ${error}`,
      })
    );
});

module.exports = router;
