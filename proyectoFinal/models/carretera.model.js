module.exports = (sequelize, Sequelize) => {
    const Carretera = sequelize.define("carretera", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        estado: {
            type: Sequelize.STRING,
            allowNull: false
        },
        razon_bloqueo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        trazado: {
            type: Sequelize.GEOMETRY("LINESTRING"),
            allowNull: false
        }
    });
    return Carretera;
};
