import User from "../models/user.model.mjs";
import { generateAuthToken } from "./generateToken.mjs";

export const handleOAuthUser = async ({
    email,
    provider,
    providerId,
    avatar,
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
                    [`${provider}Id`]: providerId,
                    avatar
                }
            }
        });

        return res.redirect(
            `${frontendUrl}/choose-username?userId=${user._id}`
        );
    }

    // 🔥 IMPORTANT FIX
    // If user already exists but avatar is missing, save it
    if (avatar && user.providers?.[provider]) {
        user.providers[provider].avatar = avatar;
        await user.save();
    }

    // EXISTING USER BUT PROVIDER NOT LINKED
    if (!user.providers?.[provider]?.[`${provider}Id`]) {

        return res.redirect(
            `${frontendUrl}/link-account?provider=${provider}&email=${email}&providerId=${providerId}`
        );
    }

    // USERNAME NOT SET
    if (!user.username) {

        return res.redirect(
            `${frontendUrl}/choose-username?userId=${user._id}`
        );
    }

    // LOGIN SUCCESS
    const token = generateAuthToken(user._id, provider);

    return res.redirect(
        `${frontendUrl}/oauth-success?token=${token}`
    );

};