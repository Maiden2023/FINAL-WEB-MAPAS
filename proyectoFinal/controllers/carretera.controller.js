const db = require("../models");

exports.listCarreteras = async (req, res) => {
    try {
        const carreteras = await db.carreteras.findAll();
        res.json({ success: true, data: carreteras });
    } catch (error) {
        console.error("Error al listar carreteras:", error);
        res.status(500).json({ success: false, message: "Error al listar carreteras." });
    }
};

exports.createCarretera = async (req, res) => {
    try {
        const carretera = await db.carreteras.create(req.body);
        res.status(201).json({ success: true, data: carretera });
    } catch (error) {
        console.error("Error al crear carretera:", error);
        res.status(500).json({ success: false, message: "Error al crear carretera." });
    }
};

exports.updateCarretera = async (req, res) => {
    try {
        const { id } = req.params;
        const carretera = await db.carreteras.findByPk(id);
        if (!carretera) {
            return res.status(404).json({ success: false, message: "Carretera no encontrada." });
        }
        await carretera.update(req.body);
        res.json({ success: true, message: "Carretera actualizada correctamente." });
    } catch (error) {
        console.error("Error al actualizar carretera:", error);
        res.status(500).json({ success: false, message: "Error al actualizar carretera." });
    }
};

exports.deleteCarretera = async (req, res) => {
    try {
        const { id } = req.params;
        const carretera = await db.carreteras.findByPk(id);
        if (!carretera) {
            return res.status(404).json({ success: false, message: "Carretera no encontrada." });
        }
        await carretera.destroy();
        res.json({ success: true, message: "Carretera eliminada correctamente." });
    } catch (error) {
        console.error("Error al eliminar carretera:", error);
        res.status(500).json({ success: false, message: "Error al eliminar carretera." });
    }
};
