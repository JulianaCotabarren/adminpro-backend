const { response } = require("express");
const User = require("../models/user");
const Hospital = require("../models/hospital");
const Doctor = require("../models/doctor");

const getAll = async (req, res = response) => {
  const search = req.params.search;
  const regex = new RegExp(search, "i");

  const [users, hospitals, doctors] = await Promise.all([
    User.find({ name: regex }),
    Hospital.find({ name: regex }),
    Doctor.find({ name: regex }),
  ]);

  res.json({
    ok: true,
    users,
    hospitals,
    doctors,
  });
};

const getDocumentsCollection = async (req, res = response) => {
  const search = req.params.search;
  const table = req.params.table;
  const regex = new RegExp(search, "i");

  let data = [];

  switch (table) {
    case "doctors":
      data = await Doctor.find({ name: regex })
        .populate("user", "name img")
        .populate("hospital", "name img");
      break;
    case "hospitals":
      data = await Hospital.find({ name: regex }).populate("user", "name img");
      break;
    case "users":
      data = await User.find({ name: regex });

      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "Please verify the search table",
      });
  }
  res.json({
    ok: true,
    results: data,
  });
};

module.exports = { getAll, getDocumentsCollection };
