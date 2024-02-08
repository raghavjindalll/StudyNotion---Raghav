const Tag = require("../models/Tag");

// Creating Tag
exports.createTag = async (req, res) => {
  try {
    // Fetching Data
    const { name, description } = req.body;

    // Validating
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Creating entry in DB
    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });

    // Returning response
    return res.status(200).json({
      success: true,
      message: "Tag created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Getting all the tags

exports.showAllTags = async(req,res) => {
    try{
        const allTags = await Tag.find({}, {name:true, description: true})
        res.status(200).json({
            success: true,
            message: "All Tags returned successfully",
            allTags
        })
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
}