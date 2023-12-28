const mongoose = require("mongoose");
const getDefaultBulkwriteResult = require("mongoose/lib/helpers/getDefaultBulkwriteResult");

const DB =
  "mongodb+srv://validatascientist:FVYqt7dmiKCDgSsK@cluster0.5lcjc.mongodb.net/CourseSellingApplication";

// Connect to MongoDB
mongoose
  .connect(DB)
  .then((connection) => {
    console.log("Database connection successful");
  })
  .catch((error) =>
    console.log(`Error occured while connecting to Database. ${error}`)
  );

// Define schemas
const AdminSchema = new mongoose.Schema({
  username: { type: String, unique: [true, "username already exists"] },
  password: String,
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [CourseSchema],
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
