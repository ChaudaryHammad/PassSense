import jwt from "jsonwebtoken";

export default function generateJwtTokenAndSetCookie(res, userId) {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return token;
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Error in Tokenization(JWT)",
      error: error.message,
    });
  }
}
