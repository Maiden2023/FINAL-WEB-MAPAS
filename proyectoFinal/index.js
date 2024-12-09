const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const session = require('express-session'); // Declaración única
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

// Configuración de body-parser
// Configuración de body-parser y JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Agregado para procesar cuerpos JSON


// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Configuración de subida de archivos
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // Límite de 50 MB
}));

// Configuración de sesiones
app.use(session({
    secret: 'esta es la clave de encriptación de la sesión y puede ser cualquier texto',
    resave: false, // Evita guardar la sesión si no hubo cambios
    saveUninitialized: false, // No guarda sesiones vacías
}));

// Cargar la base de datos
const db = require("./models");

app.use(cors({
    origin: "http://localhost:5173", // El dominio del frontend
    credentials: true, // Permite enviar cookies/sesiones si es necesario
}));

db.sequelize.sync({
    // force: true // Descomenta si deseas recrear las tablas en cada inicio
}).then(() => {
    console.log("Base de datos sincronizada.");
});

// Middleware para manejar sesiones
app.use(function (req, res, next) {
    res.locals.usuario = req.session.usuario;
    next();
});

app.post("/api/incidentes", upload.single("foto"), (req, res) => {
    const { detalle, carreteraId } = req.body;
    const foto = req.file;
  
    // Lógica para guardar el incidente en la base de datos
    res.json({ success: true, message: "Incidente reportado exitosamente." });
  })

// Cargar las rutas
require('./routes')(app);

// Iniciar el servidor
app.listen(3000, function () {
    console.log('Ingrese a http://localhost:3000');
});
