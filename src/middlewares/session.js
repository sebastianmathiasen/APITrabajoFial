const { tokenVerify } = require("../utils/handleJWT");

const isAuth = async (req, res, next) => {
    let error = new Error("Forbidden access | Invalid Token")
    if (!req.headers.authorization) {
        let error = new Error("No token provided");
        error.status = 403;
        return next(error);
    };
    // Check from here, roto probamos el debugging con logs
    const token = req.headers.authorization.split(" ").pop();

    const verifiedToken = await tokenVerify(token);
    if (verifiedToken instanceof Error) {
        error.status = 401;
        error.message = "Invalid token";
        return next(error);
    }
    next();
};

module.exports = isAuth;