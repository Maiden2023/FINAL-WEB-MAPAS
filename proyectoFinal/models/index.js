const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.usuarios = require("./usuario.model")(sequelize, Sequelize);
db.municipios = require("./municipio.model")(sequelize, Sequelize);
db.carreteras = require("./carretera.model")(sequelize, Sequelize);
db.incidentes = require("./incidente.model")(sequelize, Sequelize);
db.fotos = require("./foto.model")(sequelize, Sequelize);
db.solicitudes = require("./solicitud.model")(sequelize, Sequelize);

// Relaciones
db.usuarios.hasMany(db.incidentes, { as: "incidentes" });
db.incidentes.belongsTo(db.usuarios, { foreignKey: "usuarioId", as: "usuario" });

db.municipios.hasMany(db.carreteras, { as: "carreterasOrigen", foreignKey: "id_municipio_origen" });
db.municipios.hasMany(db.carreteras, { as: "carreterasDestino", foreignKey: "id_municipio_destino" });
db.carreteras.belongsTo(db.municipios, { foreignKey: "id_municipio_origen", as: "municipioOrigen" });
db.carreteras.belongsTo(db.municipios, { foreignKey: "id_municipio_destino", as: "municipioDestino" });

db.incidentes.hasMany(db.fotos, { as: "fotos" });
db.fotos.belongsTo(db.incidentes, { foreignKey: "incidenteId", as: "incidente" });

module.exports = db;
