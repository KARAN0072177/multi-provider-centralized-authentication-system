import bcrypt from "bcrypt";
import User from "../models/user.model.mjs";
import { generateVerificationToken } from "../utils/generateToken.mjs";
import { sendVerificationEmail } from "../utils/sendEmail.mjs";
import jwt from "jsonwebtoken";
import { generateAuthToken } from "../utils/generateToken.mjs";

// Registration controller - handles user registration, validation, and sending verification email

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username is required for email registration"
      });
    }

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

// Email verification controller - verifies the token and updates user status

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Verification token missing"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verified"
      });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: "Invalid or expired token"
    });
  }
};

// Login controller - handles user login, credential validation, and token generation

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Identifier and password required"
      });
    }

    const user = await User.findOne({
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    if (!user.providers?.local?.passwordHash) {
      return res.status(400).json({
        message: "Account registered using OAuth provider"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.providers.local.passwordHash
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first"
      });
    }

    const token = generateAuthToken(user._id, "local");

    return res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

export const linkOAuthAccount = async (req, res) => {

  try {

    const { email, provider, providerId } = req.body;

    if (!email || !provider || !providerId) {
      return res.status(400).json({
        message: "Missing required data"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.providers?.[provider]?.[`${provider}Id`]) {
      return res.status(400).json({
        message: `${provider} already linked`
      });
    }

    user.providers[provider] = {
      [`${provider}Id`]: providerId
    };

    await user.save();

    res.json({
      message: `${provider} account linked successfully`
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};