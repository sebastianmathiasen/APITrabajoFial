// Importo la encriptacion de password
const bc = require("../utils/handlePassword");
// Me conecto a travez del modelo para poder trabajar con la base de datos
const User = require("./usersMd");
// Importo direccion publica
const public_url = process.env.public_url;
// Importo funciones de Json Web Token
const jwt = require("../utils/handleJWT");
// Importo hadleMail
const transporter = require("../utils/handleMailer");

// Get all users
const getAllusers = (req, res, next) => {
    // Metodo find me trae todo de una collecion en particular
    User.find().then((data) => {
        !data.length
            ? next()
            : res.status(200).json(data);
    }).catch((error) => {
        error.status = 500;
        next(error);
    });
};

// Create user
const createUser = async (req, res, next) => {
    // La inicio vacia por si no se carga la imagen al crear
    let pic = "";
    if (req.file) {
        // Trabajo con la imagen para guardarla
        pic = `${public_url}/storage/${req.file.filename}`;
    };
    // Aqui es donde encripto la contrasenia y la paso
    const password = await bc.hashPassword(req.body.password);

    // Y en el send cambio la contrasenia que voy a guardar por la encriptada

    // Send to database
    try {
        const newUser = new User({ ...req.body, profilePic: pic, password });
        const result = await newUser.save();
        res.status(200).json(result);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

// Update user
const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).json({ message: "Usuario con cambios", usuario: user });
    } catch (error) {
        next();
    }
};

// Delete user by id
const deleteUserById = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ user: user.id, message: "Usuario borrado" });
    } catch (error) {
        next();
    }
};

// Login (en un proyecto real seria conveniente tener un servicio de autorizacion y autentificacion con el manejo de login y register)
const loginUser = async (req, res, next) => {
    let error = new Error("Email or Password Invalid");
    const user = await User.find().where({ email: req.body.email });
    if (!user.length) {
        return next(error);
    }
    // Tomo la contrasenia y la comparo
    const hashedPassword = user[0].password;
    // Aca las comparo y paso como parametros las dos contrasenias que debe comparar 
    const match = await bc.checkPassword(req.body.password, hashedPassword);
    if (!match) {
        error.status = 401;
        return next(error);
    }

    // Gestion de Token
    const userForToken = {
        email: user[0].email,
        fullName: user[0].fullName,
        userName: user[0].userName
    };
    const accessToken = await jwt.tokenSing(userForToken, "24h");
    res.status(200).json({ message: "Access granted", token: accessToken, userData: userForToken });
};

// Forgot password (Este servicio enviara un mail con un link de recuperacion de contrasenia a el mail del usuario registrado en la base de datos. Desde ese link, que incluira un token de seguridad, podemos ir al formulario de recuperacion de contrasenia -> esta percibira en la base de datos (en el documento del usuario en cuestion))

const forgot = async (req, res, next) => {
    let error = new Error("No user with that email");
    const user = await User.find().where({ email: req.body.email });
    if (!user.length) {
        error.status = 404;
        return next(error);
    }
    // Si existe email, generamos el token de seguridad y el link de restauracion de contrasenia que enviaremos al usuario (dentro del token tengo todos estos datos que puedo usar mas adelante)
    const userForToken = {
        id: user[0].id,
        name: user[0].fullName,
        email: user[0].email
    };
    const token = await jwt.tokenSing(userForToken, "30m");
    const link = `${process.env.public_url}/api/users/reset/${token}`;

    // Creamos el cuerpo del email, lo enviamos al usuario e indicamos esto en la response 
    const mailDetails = {
        from: "tech-support@imaginarium.com",
        to: userForToken.email,
        subject: "Password recovery",
        html: `<h2>Password Recovery Service<h2>
        <p>To reset your password, please click the link and type in a new password<p>
        <a href="${link}">Click to reset password</a>
        `
    };
    transporter.sendMail(mailDetails, (error, data) => {
        if (error) {
            next(error);
        } else {
            res.status(200).json({ message: `Hi ${userForToken.name}, we've sent an email with instructions to ${userForToken.email}` })
        }
    });
}
const reset = async (req, res, next) => {
    const { token } = req.params;
    const tokenStatus = await jwt.tokenVerify(token);
    if (tokenStatus instanceof Error) {
        return next(tokenStatus)
    }
    // Cambiar mensaje para que no muestre datos
    res.status(200).json({ token, tokenStatus });
};

const saveNewPass = async (req, res, next) => {
    const { token } = req.params;
    const tokenStatus = await jwt.tokenVerify(token);

    if (tokenStatus instanceof Error) {
        return next(tokenStatus);
    };
    const newPassword = await bc.hashPassword(req.body.password);
    try {
        const updatedUser = await User.findByIdAndUpdate(tokenStatus.id, { password: newPassword });
        res.status(200).json({ message: `Password changed for user ${tokenStatus.name}` });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllusers, createUser, updateUser, deleteUserById, loginUser, forgot, reset, saveNewPass };



