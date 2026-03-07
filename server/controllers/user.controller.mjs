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

    return res.json({
      username: user.username,
      email: user.email,
      loginMethod,
      createdAt: user.createdAt
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }
};