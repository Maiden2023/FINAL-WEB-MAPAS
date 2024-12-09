const router = require("express").Router();
const controller = require("../controllers/incidente.controller");
const { authenticateToken } = require("../middlewares/auth");

// Rutas protegidas con token
router.get("/",  controller.listIncidentes);
router.post("/",  controller.createIncidente);
router.delete("/:id", controller.deleteIncidente);

module.exports = router;
