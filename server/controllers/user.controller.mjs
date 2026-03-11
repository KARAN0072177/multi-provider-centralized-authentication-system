export const getProfile = async (req, res) => {

  try {

    const user = req.user;

    const provider = req.provider;

    const loginMethod =
      provider === "local"
        ? "Email/Password"
        : provider.charAt(0).toUpperCase() + provider.slice(1);

    let avatar = null;

    if (provider !== "local") {
      avatar = user.providers?.[provider]?.avatar;
    }

    const linkedAccounts = {
      emailPassword: !!user.providers?.local?.passwordHash,
      google: !!user.providers?.google?.googleId,
      github: !!user.providers?.github?.githubId,
      microsoft: !!user.providers?.microsoft?.microsoftId
    };

    return res.json({
      username: user.username,
      email: user.email,
      avatar,
      loginMethod,
      createdAt: user.createdAt,
      linkedAccounts
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};