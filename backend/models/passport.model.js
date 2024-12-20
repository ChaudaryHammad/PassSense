import mongoose from "mongoose";

const passportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    givenName: {
      type: String,
      required: true,
    },
    surName: {
      type: String,
      required: true,
    },
    passportNumber: {
      type: String,

      required: true,
    },
    nationality: {
      type: String,
      default: "PAK",
    },
    dob: {
      type: String,
    },
    sex: {
      type: String,
      required: true,
    },
    personalNumber: {
      type: String,
      required: false,
    },
    expirationDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Passport = mongoose.model("Passport", passportSchema);
