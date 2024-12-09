const router = require("express").Router();
const controller = require("../controllers/municipio.controller.js");

console.log("Controlador importado:", controller);

router.get("/", controller.listMunicipios);
router.post("/", controller.createMunicipio);
router.put("/:id", controller.updateMunicipio);
router.delete("/:id", controller.deleteMunicipio);

module.exports = router;
