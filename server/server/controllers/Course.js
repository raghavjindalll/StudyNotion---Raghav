const Course = require("../models/Course");
const Tag = require("../models/Tag");
const User = require("../models/User");
const { uploadImageToCloudiary } = require("../utils/imageUploader");

// Creating course
exports.createCourse = async (req, res) => {
  try {
    //  Fetching Data
    const { courseName, courseDescription, whatWillYouLearn, price, tag } =
      req.body;
    const thumbnail = req.files.thumbnailImage;

    // Validation
    if (
      !Course ||
      !!courseDescription ||
      !whatWillYouLearn ||
      !price ||
      !tag ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //  Checking for instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    // Validation of tag
    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: "Tag Details Not Found",
      });
    }

    // Uploading Image
    const thumbnailImage = await uploadImageToCloudiary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    // Creating entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatWillYouLearn: whatWillYouLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // Adding course to instructor schema
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // Adding course to categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
        { _id: category },
        {
          $push: {
            courses: newCourse._id,
          },
        },
        { new: true }
      )

    // Returning the response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in creating the course",
    });
  }
};

// Fetching all courses

exports.showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

      return res.status(200).json({
        success: true,
        message: "Data for all courses fetched successfully"
      })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Can not fetch course data",
      error: error.message,
    });
  }
};
