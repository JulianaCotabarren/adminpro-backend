const { Schema, model } = require("mongoose");

const DoctorSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  hospital: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Hospital",
  },
});

DoctorSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Doctor", DoctorSchema);
