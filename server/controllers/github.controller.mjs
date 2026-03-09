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

    // fetch user profile
    const userResponse = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const githubId = userResponse.data.id;

    // fetch email (GitHub keeps email separate)
    const emailResponse = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const primaryEmail = emailResponse.data.find(
      (email) => email.primary
    ).email;

    await handleOAuthUser({
      email: primaryEmail,
      provider: "github",
      providerId: githubId,
      res,
      frontendUrl: process.env.FRONTEND_URL
    });

  } catch (error) {

    console.error(error);

    res.status(500).send("GitHub authentication failed");

  }

};