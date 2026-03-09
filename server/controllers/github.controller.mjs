import axios from "axios";
import { handleOAuthUser } from "../utils/oauth.service.mjs";

export const githubAuth = (req, res) => {

  const url =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&scope=user:email`;

  res.redirect(url);

};

export const githubCallback = async (req, res) => {

  try {

    const { code } = req.query;

    if (!code) {
      return res.status(400).send("Missing GitHub code");
    }

    // exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      {
        headers: { Accept: "application/json" }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // 🔴 important check
    if (!accessToken) {
      console.error("GitHub token error:", tokenResponse.data);
      return res.status(400).send("GitHub access token not received");
    }

    // fetch user profile
    const userResponse = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json"
        }
      }
    );

    const githubId = userResponse.data.id;
    const avatar = userResponse.data.avatar_url;

    // fetch email
    const emailResponse = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json"
        }
      }
    );

    const primaryEmail = emailResponse.data.find(e => e.primary)?.email;

    if (!primaryEmail) {
      return res.status(400).send("GitHub email not found");
    }

    await handleOAuthUser({
      email: primaryEmail,
      provider: "github",
      providerId: githubId,
      avatar,
      res,
      frontendUrl: process.env.FRONTEND_URL
    });

  } catch (error) {

    console.error("GitHub OAuth Error:", error.response?.data || error.message);

    res.status(500).send("GitHub authentication failed");

  }

};