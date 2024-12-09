module.exports = (sequelize, Sequelize) => {
    const Municipio = sequelize.define("municipio", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        coordenadas: {
            type: Sequelize.GEOMETRY("POINT"),
            allowNull: false
        }
    });
    return Municipio;
};
