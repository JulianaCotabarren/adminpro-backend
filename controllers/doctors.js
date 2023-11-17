const { response } = require("express");
const Doctor = require("../models/doctor");

const getDoctors = async (req, res = response) => {
  const doctors = await Doctor.find(/* {}, "name img user" */)
    .populate("user", "name img")
    .populate("hospital", "name img");

  res.json({
    ok: true,
    doctors,
    id: req.id,
  });
};

const createDoctor = async (req, res = response) => {
  const { name } = req.body;
  const { uid } = req.uid;
  const doctor = new Doctor({ user: uid, /* hospital: id, */ ...req.body });

  try {
    const nameExist = await Doctor.findOne({ name });

    if (nameExist) {
      return res.status(400).json({
        ok: false,
        msg: "The name has already been registered",
      });
    }

    const doctorDB = await doctor.save();

    res.json({
      ok: true,
      doctor: doctorDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const updateDoctor = (req, res = response) => {
  res.json({
    ok: true,
    msg: "updateDoctor",
  });
};

const deleteDoctor = (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteDoctor",
  });
};

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
