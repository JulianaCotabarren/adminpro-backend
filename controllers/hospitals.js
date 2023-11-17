const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital.find(/* {}, "name img user" */).populate(
    "user",
    "name img"
  );

  res.json({
    ok: true,
    hospitals,
    id: req.id,
  });
};

const createHospital = async (req, res = response) => {
  const { name } = req.body;
  const uid = req.uid;
  const hospital = new Hospital({ user: uid, ...req.body });

  try {
    const nameExist = await Hospital.findOne({ name });

    if (nameExist) {
      return res.status(400).json({
        ok: false,
        msg: "The name has already been registered",
      });
    }

    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const updateHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "updateHospital",
  });
};

const deleteHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteHospital",
  });
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
