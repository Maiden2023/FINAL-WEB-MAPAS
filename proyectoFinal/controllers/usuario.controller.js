const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const db = require("../models");

// Controlador para el login
exports.loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar que se envíen los datos
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email y contraseña son obligatorios." });
        }

        // Buscar el usuario por email
        const usuario = await db.usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Contraseña incorrecta." });
        }

        // Responder con datos del usuario y el rol
        res.json({
            success: true,
            message: "Inicio de sesión exitoso.",
            data: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
        });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ success: false, message: "Error al iniciar sesión." });
    }
};


exports.createUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !password || !rol) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios (nombre, password, rol).",
      });
    }

    const usuario = await db.usuarios.create({
      nombre,
      email: email || "22@adm.com",
      password,
      rol,
    });

    res.status(201).json({ success: true, data: usuario });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ success: false, message: "Error al crear usuario." });
  }
};


exports.listUsuarios = async (req, res) => {
    try {
        const usuarios = await db.usuarios.findAll({
            attributes: ['id', 'nombre', 'email', 'password'], // Selecciona las columnas necesarias
        });
        res.json({ success: true, data: usuarios });
    } catch (error) {
        console.error("Error al listar usuarios:", error);
        res.status(500).json({ success: false, message: "Error al listar usuarios." });
    }
};

exports.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await db.usuarios.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }

        const { nombre, email, password } = req.body;

        // Evita actualizar con un email ya existente
        if (email) {
            const emailExists = await db.usuarios.findOne({ where: { email, id: { [db.Sequelize.Op.ne]: id } } });
            if (emailExists) {
                return res.status(400).json({ success: false, message: "El email ya está registrado." });
            }
        }

        await usuario.update({ nombre, email, password });
        res.json({ success: true, message: "Usuario actualizado correctamente." });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ success: false, message: "Error al actualizar usuario." });
    }
};


exports.deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await db.usuarios.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }

        await usuario.destroy();
        res.json({ success: true, message: "Usuario eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ success: false, message: "Error al eliminar usuario." });
    }
};

