const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ success: false, message: "Token no proporcionado." });

    jwt.verify(token.split(" ")[1], "mi_secreto", (err, user) => {
        if (err) return res.status(403).json({ success: false, message: "Token inválido." });
        req.user = user;
        next();
    });
};
