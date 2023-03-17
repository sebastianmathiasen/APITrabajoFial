const router = require('express').Router();
const uploadPic = require('../utils/handleStorage');
const userCt = require("./usersCt");
const validator = require("../validators/user");

// Hacer otra carpeta para login y register

// Get lo utilizo para traer la data
router.get("/", userCt.getAllusers);
// Post lo uso para crear un nuevo recurso
router.post("/",
    uploadPic.single("profilePic"),
    validator.createUser,
    userCt.createUser
);
// Path o put lo utilizo para update o modificar
router.patch("/:id", userCt.updateUser);
// Delete lo uso para borrar data
router.delete("/:id", userCt.deleteUserById);

// Esto mas modificar borrar deberia estar en otro archivo protegido por el token
router.post("/login", userCt.loginUser);

// Send request for password resetting
router.post("/forgot-password", userCt.forgot);

// Link para redireccionar contrasenia para resetear
router.get("/reset/:token", userCt.reset);
// Proceso de reset
router.post("/reset/:token", validator.resetPassword, userCt.saveNewPass);

module.exports = router;