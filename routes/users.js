/* 
Route: /api/users 
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const {
  validateJWT,
  validateADMIN_ROLE,
  validateADMIN_ROLE_or_SameUser,
} = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT, getUsers);
router.post(
  "/",
  [
    check("name", "Name is mandatory").not().isEmpty(),
    check("password", "Password is mandatory").not().isEmpty(),
    check("email", "Email is mandatory").isEmail(),
    validateFields,
  ],
  createUser
);
router.put(
  "/:id",
  [
    validateJWT,
    validateADMIN_ROLE_or_SameUser,
    check("name", "Name is mandatory").not().isEmpty(),
    check("email", "Email is mandatory").isEmail(),
    check("role", "Role is mandatory").not().isEmpty(),
    validateFields,
  ],
  updateUser
);
router.delete("/:id", validateJWT, validateADMIN_ROLE, deleteUser);

module.exports = router;
