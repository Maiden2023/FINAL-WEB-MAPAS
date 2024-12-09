module.exports = (sequelize, Sequelize) => {
    const Foto = sequelize.define("foto", {
        archivo: {
            type: Sequelize.BLOB("long"),
            allowNull: false
        },
        nombre_archivo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tipo_archivo: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Foto;
};
