import User from "../models/user.model.mjs";
import { generateAuthToken } from "./generateToken.mjs";

export const handleOAuthUser = async ({
  email,
  provider,
  providerId,
  res,
  frontendUrl
}) => {

  let user = await User.findOne({ email });

  // NEW USER
  if (!user) {

    user = await User.create({
      email,
      isVerified: true,
      providers: {
        [provider]: {
          [`${provider}Id`]: providerId
        }
      }
    });

    return res.redirect(
      `${frontendUrl}/choose-username?userId=${user._id}`
    );
  }

  // EXISTING USER BUT PROVIDER NOT LINKED
  if (!user.providers?.[provider]?.[`${provider}Id`]) {

    return res.redirect(
      `${frontendUrl}/link-${provider}?email=${email}&${provider}Id=${providerId}`
    );
  }

  // USERNAME NOT SET
  if (!user.username) {

    return res.redirect(
      `${frontendUrl}/choose-username?userId=${user._id}`
    );
  }

  // LOGIN SUCCESS
  const token = generateAuthToken(user._id);

  return res.redirect(
    `${frontendUrl}/oauth-success?token=${token}`
  );

};