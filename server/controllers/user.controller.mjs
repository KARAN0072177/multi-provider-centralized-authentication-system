export const getProfile = async (req, res) => {

  try {

    const user = req.user;

    const loginMethod =
      req.provider === "local"
        ? "Email/Password"
        : req.provider.charAt(0).toUpperCase() + req.provider.slice(1);

    const linkedAccounts = {
      emailPassword: !!user.providers?.local?.passwordHash,
      google: !!user.providers?.google?.googleId,
      github: !!user.providers?.github?.githubId,
      microsoft: !!user.providers?.microsoft?.microsoftId
    };

    return res.json({
      username: user.username,
      email: user.email,
      loginMethod,
      avatar: user.avatar,
      createdAt: user.createdAt,
      linkedAccounts
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};