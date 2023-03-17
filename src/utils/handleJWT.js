const jwt = require("jsonwebtoken");
const jwt_secret = process.env.jwt_secret;

// crea el token, recibe el objeto "usuario" (payload con user data de la DB)

const tokenSing = async (user, time) => {
    const sign = jwt.sign(user, jwt_secret, { expiresIn: time });
    return sign;
};

// verifica que el token haya sido firmado por el backend, el metodo recibe el token de sesion

const tokenVerify = async (tokenJWT) => {
    try {
     const verified = await jwt.verify(tokenJWT, jwt_secret);
     return verified
    } catch (error) {
        return error;
    }
};

module.exports = { tokenSing, tokenVerify }