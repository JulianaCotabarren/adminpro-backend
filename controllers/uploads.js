const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/update-image");

const fileUpload = (req, res = response) => {
  const type = req.params.type;
  const id = req.params.id;

  const validTypes = ["hospitals", "doctors", "users"];

  if (!validTypes.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: "It is not a doctor, hospital or user",
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No files were uploaded.",
    });
  }

  //Process image
  const file = req.files.image;
  const splitName = file.name.split(".");
  const fileExtension = splitName[splitName.length - 1];

  //Validate estension
  const validExtensions = ["png", "jpg", "jpeg", "gif"];
  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({
      ok: false,
      msg: "Incorrect file extension",
    });
  }

  //Generate file name
  const fileName = `${uuidv4()}.${fileExtension}`;

  //Path to save image
  const path = `./uploads/${type}/${fileName}`;

  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error moving image",
      });
    }

    updateImage(type, id, fileName);

    res.json({
      ok: true,
      msg: "File uploaded",
      fileName,
    });
  });
};

const returnImage = (req, res = response) => {
  const type = req.params.type;
  const img = req.params.img;

  const imgPath = path.join(__dirname, `../uploads/${type}/${img}`);

  if (fs.existsSync(imgPath)) {
    res.sendFile(imgPath);
  } else {
    const imgPath = path.join(__dirname, `../uploads/no-image.png`);
    res.sendFile(imgPath);
  }
};

module.exports = { fileUpload, returnImage };
