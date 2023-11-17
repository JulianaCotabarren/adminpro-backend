/* 
Route: api/uploads/
*/
const { Router } = require("express");
const expressfileUpload = require("express-fileupload");
const { validateJWT } = require("../middlewares/validate-jwt");
const { fileUpload, returnImage } = require("../controllers/uploads");

const router = Router();

router.use(expressfileUpload());

router.get("/:type/:img", returnImage);
router.put("/:type/:id", validateJWT, fileUpload);

module.exports = router;
