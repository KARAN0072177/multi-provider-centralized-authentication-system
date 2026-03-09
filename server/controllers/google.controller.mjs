import client from "../utils/googleOAuth.mjs";
import User from "../models/user.model.mjs";
import { handleOAuthUser } from "../utils/oauth.service.mjs";

export const googleAuth = (req, res) => {

    const url = client.generateAuthUrl({
        access_type: "offline",
        scope: ["profile", "email"],
        prompt: "select_account"
    });

    res.redirect(url);

};

export const googleCallback = async (req, res) => {

    try {

        const { code } = req.query;

        const { tokens } = await client.getToken(code);

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        const email = payload.email;
        const googleId = payload.sub;
        const avatar = payload.picture;

        await handleOAuthUser({
            email,
            provider: "google",
            providerId: googleId,
            avatar,
            res,
            frontendUrl: process.env.FRONTEND_URL
        });

    } catch (error) {

        console.error(error);

        res.status(500).send("Google authentication failed");

    }

};

// Controller to set username for new Google users

export const setUsername = async (req, res) => {
    try {

        const { userId, username } = req.body;

        if (!userId || !username) {
            return res.status(400).json({
                message: "User ID and username required"
            });
        }

        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({
                message: "Username already taken"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.username) {
            return res.status(400).json({
                message: "Username already set"
            });
        }

        user.username = username;

        await user.save();

        res.json({
            message: "Username set successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }
};

// Controller to link Google account for existing users

export const linkGoogleAccount = async (req, res) => {

    try {

        const { email, googleId } = req.body;

        if (!email || !googleId) {
            return res.status(400).json({
                message: "Missing data"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.providers.google?.googleId) {
            return res.status(400).json({
                message: "Google already linked"
            });
        }

        user.providers.google = {
            googleId
        };

        await user.save();

        res.json({
            message: "Google account linked successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }
};