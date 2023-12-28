/* 
Route:/api/doctors
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorById,
} = require("../controllers/doctors");

const router = Router();

router.get("/", validateJWT, getDoctors);
router.post(
  "/",
  [
    validateJWT,
    check("name", "The doctor's name is mandatory").not().isEmpty(),
    check("hospital", "The hospital id must be valid").isMongoId(),
    /* check("user", "The registered user is mandatory").not().isEmpty(), */
    validateFields,
  ],
  createDoctor
);
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "The doctor's name is mandatory").not().isEmpty(),
    check("hospital", "The hospital id must be valid").isMongoId(),
    /* check("user", "The registered user is mandatory").not().isEmpty(), */
    validateFields,
  ],
  updateDoctor
);
router.delete("/:id", validateJWT, deleteDoctor);
router.get("/:id", validateJWT, getDoctorById);

module.exports = router;
