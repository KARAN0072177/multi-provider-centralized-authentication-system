import bcrypt from "bcrypt";
import User from "../models/user.model.mjs";
import { generateVerificationToken } from "../utils/generateToken.mjs";
import { sendVerificationEmail } from "../utils/sendEmail.mjs";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      providers: {
        local: {
          passwordHash: hashedPassword
        }
      }
    });

    const token = generateVerificationToken(newUser._id, email);

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await sendVerificationEmail(email, verificationLink);

    return res.status(201).json({
      message: `Verification email sent to ${email}`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};