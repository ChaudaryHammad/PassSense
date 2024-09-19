import { Passport } from "../models/passport.model.js";
// Controller to create a new passport for a user
export const createPassport = async (req, res) => {
  const { userId } = req.user; // Extract userId from the authenticated user
  const {
    givenName,
    surName,
    passportNumber,
    nationality,
    dob,
    sex,
    personalNumber,
    expirationDate,
  } = req.body;

  // Check for required fields
  if (!passportNumber || !givenName || !surName || !dob || !sex) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  try {
    // Check if the user has already saved this passport number
    const existingPassport = await Passport.findOne({ passportNumber, userId });

    if (existingPassport) {
      return res.status(400).json({
        success: false,
        message: "You have already saved this passport.",
      });
    }

    // Create new passport instance
    const passport = new Passport({
      givenName,
      surName,
      passportNumber,
      nationality,
      dob,
      sex,
      personalNumber,
      expirationDate,
      userId, // Associate the passport with the current user
    });

    // Save the passport
    await passport.save();

    return res.status(201).json({
      success: true,
      message: "Passport created successfully",
      passport,
    });
  } catch (error) {
    console.error("Error creating passport:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create passport, please try again",
      error: error.message,
    });
  }
};

// Controller to retrieve all passports associated with the logged-in user
export const userPassports = async (req, res) => {
  const { userId } = req.user;

  try {
    // Find all passports associated with the user
    const passports = await Passport.find({ userId });

    if (!passports || passports.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No passports found for the user",
      });
    }

    return res.status(200).json({
      success: true,
      passports,
    });
  } catch (error) {
    console.error("Error fetching passports:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve passports, please try again",
      error: error.message,
    });
  }
};



export const deletePassport = async (req, res) => {
    const { userId } = req.user;
    console.log(userId);
    const { passportId } = req.params;
    console.log(passportId);
  
    try {
      // Find the passport by ID and ensure it belongs to the logged-in user
      const passport = await Passport.findOne({ _id: passportId, userId });
  
      if (!passport) {
        return res.status(404).json({
          success: false,
          message: "Passport not found or not authorized to delete",
        });
      }
  
      // Delete the passport
      await Passport.deleteOne({ _id: passportId });
  
      return res.status(200).json({
        success: true,
        message: "Passport deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting passport:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to delete passport, please try again",
        error: error.message,
      });
    }
  };


  export const updatePassport = async (req, res) => {
    const { userId } = req.user;
    const { passportId } = req.params;
    const updateFields = req.body; // Assuming user sends only the fields they want to update
  
    try {
      // Find the passport by ID and ensure it belongs to the logged-in user
      const passport = await Passport.findOne({ _id: passportId, userId });
  
      if (!passport) {
        return res.status(404).json({
          success: false,
          message: "Passport not found or not authorized to update",
        });
      }
  
      // Update the passport with new fields
      Object.keys(updateFields).forEach((field) => {
        passport[field] = updateFields[field];
      });
  
      await passport.save();
  
      return res.status(200).json({
        success: true,
        message: "Passport updated successfully",
        passport,
      });
    } catch (error) {
      console.error("Error updating passport:", error.message);
      return res.status(500).json({
        success: false,
        message: "Failed to update passport, please try again",
        error: error.message,
      });
    }
  };
  