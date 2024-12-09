const db = require("../models");

exports.listMunicipios = async (req, res) => {
    try {
        const municipios = await db.municipios.findAll();
        res.json({ success: true, data: municipios });
    } catch (error) {
        console.error("Error al listar municipios:", error);
        res.status(500).json({ success: false, message: "Error al listar municipios." });
    }
};

exports.createMunicipio = async (req, res) => {
    try {
        const { nombre, coordenadas } = req.body;

        // Validación básica
        if (!nombre || !coordenadas || coordenadas.type !== "Point" || !Array.isArray(coordenadas.coordinates)) {
            return res.status(400).json({ success: false, message: "Datos inválidos" });
        }

        // Creación del municipio
        const municipio = await db.municipios.create({
            nombre,
            coordenadas
        });

        res.status(201).json({ success: true, data: municipio });
    } catch (error) {
        console.error("Error al crear municipio:", error);
        res.status(500).json({ success: false, message: "Error al crear municipio." });
    }
};

exports.updateMunicipio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, coordenadas } = req.body;

        // Buscar el municipio por su ID
        const municipio = await db.municipios.findByPk(id);
        if (!municipio) {
            return res.status(404).json({ success: false, message: "Municipio no encontrado." });
        }

        // Validar coordenadas
        if (coordenadas && (!coordenadas.type || !Array.isArray(coordenadas.coordinates))) {
            return res.status(400).json({ success: false, message: "Coordenadas inválidas." });
        }

        // Actualizar el municipio
        await municipio.update({
            nombre,
            coordenadas
        });

        res.json({ success: true, message: "Municipio actualizado correctamente." });
    } catch (error) {
        console.error("Error al actualizar municipio:", error);
        res.status(500).json({ success: false, message: "Error al actualizar municipio." });
    }
};


exports.deleteMunicipio = async (req, res) => {
    try {
        const { id } = req.params;
        const municipio = await db.municipios.findByPk(id);
        if (!municipio) {
            return res.status(404).json({ success: false, message: "Municipio no encontrado." });
        }

        await municipio.destroy();
        res.json({ success: true, message: "Municipio eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar municipio:", error);
        res.status(500).json({ success: false, message: "Error al eliminar municipio." });
    }
};
