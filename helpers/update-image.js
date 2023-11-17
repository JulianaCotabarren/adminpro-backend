const fs = require("fs");

const User = require("../models/user");
const Hospital = require("../models/hospital");
const Doctor = require("../models/doctor");

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

let oldPath = "";

const updateImage = async (type, id, fileName) => {
  switch (type) {
    case "users":
      const user = await User.findById(id);
      if (!user) {
        return false;
      }

      oldPath = `./uploads/users/${user.img}`;
      deleteImage(oldPath);

      user.img = fileName;
      await user.save();
      return true;
      break;

    case "hospitals":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        return false;
      }

      oldPath = `./uploads/hospitals/${hospital.img}`;
      deleteImage(oldPath);

      hospital.img = fileName;
      await hospital.save();
      return true;
      break;

    case "doctors":
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return false;
      }

      oldPath = `./uploads/doctors/${doctor.img}`;
      deleteImage(oldPath);

      doctor.img = fileName;
      await doctor.save();
      return true;
      break;
  }
};

module.exports = { updateImage };
