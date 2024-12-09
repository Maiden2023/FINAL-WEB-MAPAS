exports.requireUser = (req, res, next) => {
    if (!req.session || !req.session.usuario) {
        return res.status(401).json({ success: false, message: "Usuario no autenticado. Por favor, inicie sesión." });
    }
    next();
};
