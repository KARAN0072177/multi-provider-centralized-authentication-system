export const getProfile = async (req, res) => {

  try {

    const user = req.user;

    let loginMethod = "Email/Password";

    if (user.providers.google?.googleId) {
      loginMethod = "Google";
    }

    if (user.providers.github?.githubId) {
      loginMethod = "GitHub";
    }

    if (user.providers.microsoft?.microsoftId) {
      loginMethod = "Microsoft";
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