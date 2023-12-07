const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res = response) => {
  const from = Number(req.query.from) || 0;
  const [users, total] = await Promise.all([
    User.find({}, "name email role google img").skip(from).limit(5),
    User.countDocuments(),
  ]);

  res.json({
    ok: true,
    users,
    uid: req.uid,
    total,
  });
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        ok: false,
        msg: "The email has already been registered",
      });
    }

    const user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    //Save user
    await user.save();

    //Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const updateUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "User does not exist with the provided id",
      });
    }

    const { password, google, email, ...fields } = req.body;

    if (userDB.email !== email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({
          ok: false,
          msg: "There is an user registered with this email",
        });
      }
    }

    if (!userDB.google) {
      fields.email = email;
    } else if (userDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: "Google users can not change their email",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    res.json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "User does not exist with the provided id",
      });
    }

    await User.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "User deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
