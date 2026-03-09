import axios from "axios";
import { handleOAuthUser } from "../utils/oauth.service.mjs";

export const microsoftAuth = (req, res) => {

  const url =
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize" +
    `?client_id=${process.env.MICROSOFT_CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${process.env.MICROSOFT_REDIRECT_URI}` +
    `&response_mode=query` +
    `&scope=openid profile email User.Read`;

  res.redirect(url);

};

export const microsoftCallback = async (req, res) => {

  try {

    const { code } = req.query;

    // Exchange code for token
    const tokenResponse = await axios.post(
      "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      new URLSearchParams({
        client_id: process.env.MICROSOFT_CLIENT_ID,
        client_secret: process.env.MICROSOFT_CLIENT_SECRET,
        code,
        redirect_uri: process.env.MICROSOFT_REDIRECT_URI,
        grant_type: "authorization_code"
      })
    );

    const accessToken = tokenResponse.data.access_token;

    // Get user profile
    const profileResponse = await axios.get(
      "https://graph.microsoft.com/v1.0/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const microsoftId = profileResponse.data.id;

    // Get email
    const email =
      profileResponse.data.mail ||
      profileResponse.data.userPrincipalName;

      const avatar = `https://graph.microsoft.com/v1.0/me/photo/$value?access_token=${accessToken}`;

    await handleOAuthUser({
      email,
      provider: "microsoft",
      providerId: microsoftId,
      avatar,
      res,
      frontendUrl: process.env.FRONTEND_URL
    });

  } catch (error) {

    console.error(error);

    res.status(500).send("Microsoft authentication failed");

  }

};