const router = require("express").Router();
const controller = require("../controllers/carretera.controller.js"); // Importa el controlador

// Rutas para carreteras
router.get("/", controller.listCarreteras); // Listar todas las carreteras
router.post("/", controller.createCarretera); // Crear una nueva carretera
router.put("/:id", controller.updateCarretera); // Actualizar una carretera existente
router.delete("/:id", controller.deleteCarretera); // Eliminar una carretera

module.exports = router;
