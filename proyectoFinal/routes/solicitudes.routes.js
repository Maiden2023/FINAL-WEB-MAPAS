const router = require("express").Router();
const controller = require("../controllers/solicitud.controller.js");

console.log("Controlador importado:", controller);

router.get("/", controller.listSolicitudes);
router.post("/", controller.insertSolicitud);
router.delete("/:id", controller.deleteSolicitud);

module.exports = router;
