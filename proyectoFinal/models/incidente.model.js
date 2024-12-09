module.exports = (sequelize, Sequelize) => {
    const Incidente = sequelize.define("incidente", {
        tipo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        detalles: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        ubicacion: {
            type: Sequelize.GEOMETRY("POINT"),
            allowNull: false
        }
    });
    return Incidente;
};
