const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const jwtGenerator = require("../utils/jwt-generator");

const register = async ({ name, email, password, role }) => {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  const { token } = jwtGenerator(newUser.id, newUser.role);

  return {
    message: "User registered successfully.",
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid email or password.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password.");

  const { token } = jwtGenerator(user.id, user.role);

  return {
    message: "Login successful.",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = { register, login };
