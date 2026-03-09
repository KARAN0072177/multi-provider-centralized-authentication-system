import jwt from "jsonwebtoken";

export const generateVerificationToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

export const generateAuthToken = (userId, provider) => {

  return jwt.sign(
    { userId, provider },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

};