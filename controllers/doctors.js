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

const updateDoctor = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: "Doctor not founded",
      });
    }

    const changesDoctor = {
      ...req.body,
      user: uid,
    };

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, changesDoctor, {
      new: true,
    });

    res.json({
      ok: true,
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

const deleteDoctor = async (req, res = response) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: "Doctor not founded",
      });
    }

    await Doctor.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Doctor deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
