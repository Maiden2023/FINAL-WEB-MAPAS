const db = require("../models");

exports.listIncidentes = async (req, res) => {
    try {
        const incidentes = await db.incidentes.findAll({
            include: [{ model: db.fotos, as: "fotos" }],
        });
        res.json({ success: true, data: incidentes });
    } catch (error) {
        console.error("Error al listar incidentes:", error);
        res.status(500).json({ success: false, message: "Error al listar incidentes." });
    }
};

exports.createIncidente = async (req, res) => {
    try {
        const { tipo, detalles, ubicacion } = req.body;

        // Validar que la ubicación tenga la estructura correcta
        if (!ubicacion || !Array.isArray(ubicacion) || ubicacion.length !== 2) {
            return res.status(400).json({
                success: false,
                message: "Ubicación debe ser un arreglo [longitud, latitud].",
            });
        }

        // Formatear la ubicación como un objeto GeoJSON
        const formattedUbicacion = {
            type: "Point",
            coordinates: ubicacion, // [longitud, latitud]
        };

        // Crear el incidente
        const incidente = await db.incidentes.create({
            tipo,
            detalles,
            ubicacion: formattedUbicacion,
        });

        res.status(201).json({ success: true, data: incidente });
    } catch (error) {
        console.error("Error al crear incidente:", error);
        res.status(500).json({ success: false, message: "Error al crear incidente." });
    }
};

exports.deleteIncidente = async (req, res) => {
    try {
        const { id } = req.params;
        const incidente = await db.incidentes.findByPk(id);
        if (!incidente) {
            return res.status(404).json({ success: false, message: "Incidente no encontrado." });
        }

        await incidente.destroy();
        res.json({ success: true, message: "Incidente eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar incidente:", error);
        res.status(500).json({ success: false, message: "Error al eliminar incidente." });
    }
};
