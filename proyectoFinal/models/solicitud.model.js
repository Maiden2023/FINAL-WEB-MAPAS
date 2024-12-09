module.exports = (sequelize, Sequelize) => {
    const Solicitud = sequelize.define("solicitud", {
        detalles: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        archivo: {
            type: Sequelize.BLOB("long"),
            allowNull: true
        },
        nombre_archivo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        tipo_archivo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ubicacion: {
            type: Sequelize.GEOMETRY("POINT"),
            allowNull: false
        }
    });
    return Solicitud;
};
