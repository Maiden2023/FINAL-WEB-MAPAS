const router = require("express").Router();
const controller = require("../controllers/usuario.controller.js");
const validateUsuario = require("../middlewares/express-validator");

console.log("Controlador importado:", controller); // Verifica las funciones importadas

router.get("/", controller.listUsuarios);
router.put("/:id", controller.updateUsuario);
router.delete("/:id", controller.deleteUsuario);
router.post("/login", controller.loginUsuario);
router.post("/", controller.createUsuario);
module.exports = router;
