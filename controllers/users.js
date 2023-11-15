const User = require("../models/user");

const getUsers = (req, res) => {
  res.json({
    ok: true,
    msg: "Getting Users",
  });
};

const createUser = async (req, res) => {
  const { email, password, name } = req.body;
  const user = new User(req.body);

  await user.save();

  res.json({
    ok: true,
    user,
  });
};

module.exports = { getUsers, createUser };
