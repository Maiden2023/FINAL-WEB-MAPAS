const db = require("../models");

exports.listSolicitudes = async (req, res) => {
    try {
        const solicitudes = await db.solicitudes.findAll();
        res.json({ success: true, data: solicitudes });
    } catch (error) {
        console.error("Error al listar solicitudes:", error);
        res.status(500).json({ success: false, message: "Error al listar solicitudes." });
    }
};

exports.insertSolicitud  = async (req, res) => {
    try {
        const { detalles, archivo, nombre_archivo, tipo_archivo, ubicacion } = req.body;

        // Validar que la ubicación tenga el formato correcto
        if (!ubicacion || !Array.isArray(ubicacion) || ubicacion.length !== 2) {
            return res.status(400).json({
                success: false,
                message: "Ubicación debe ser un arreglo [longitud, latitud].",
            });
        }

        // Formatear la ubicación como GeoJSON
        const formattedUbicacion = {
            type: "Point",
            coordinates: ubicacion, // [longitud, latitud]
        };

        // Crear la solicitud
        const solicitud = await db.solicitudes.create({
            detalles,
            archivo: archivo || null,
            nombre_archivo: nombre_archivo || null,
            tipo_archivo: tipo_archivo || null,
            ubicacion: formattedUbicacion,
        });

        res.status(201).json({ success: true, data: solicitud });
    } catch (error) {
        console.error("Error al crear solicitud:", error);
        res.status(500).json({ success: false, message: "Error al crear solicitud." });
    }
};

exports.deleteSolicitud = async (req, res) => {
    try {
        const { id } = req.params;

        const solicitud = await db.solicitudes.findByPk(id);
        if (!solicitud) {
            return res.status(404).json({ success: false, message: "Solicitud no encontrada." });
        }

        await solicitud.destroy();
        res.json({ success: true, message: "Solicitud eliminada correctamente." });
    } catch (error) {
        console.error("Error al eliminar solicitud:", error);
        res.status(500).json({ success: false, message: "Error al eliminar solicitud." });
    }
};