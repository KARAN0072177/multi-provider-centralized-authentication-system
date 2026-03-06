import jwt from "jsonwebtoken";

export const generateVerificationToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};