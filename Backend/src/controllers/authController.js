const authService = require("../services/authService");
const loggingService = require("../services/loggingService");

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    loggingService.logActivity(result.user.id, "User Registered");

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    loggingService.logActivity(result.user.id, "User Logged In");

    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { register, login };
