module.exports = (app) => {
    app.use("/api/usuarios", require("./usuarios.routes"));
    app.use("/api/municipios", require("./municipios.routes"));
    app.use("/api/carreteras", require("./carreteras.routes"));
    app.use("/api/incidentes", require("./incidentes.routes"));
    app.use("/api/solicitudes", require("./solicitudes.routes"));
};
