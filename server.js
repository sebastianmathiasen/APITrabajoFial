require("dotenv").config();

const express = require("express");
// Requiero cors para poder usar un puerto desde un servidor externo
const cors = require("cors");
require("./config/db.js");

const path = require("path");

// Defino el servidor con la siguiente sentencia
const PORT = process.env.PORT || 3030;
const server = express();

// express core middlewares
server.use(express.static('public'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// external middlewares, da la posibilidad de acceder desde cualquier lugar
server.use(cors());

// users routing
server.use('/api/users', require('./src/users/usersRt.js'));

// Posts routing
server.use("/api/posts", require("./src/stories/postsRt.js"));

// Servidor escucha puerto determinado 3030, con mensaje 
server.listen(PORT, (err) => {
    !err ?
        console.log(`Server up: http:localhost:${PORT}`)
        :
        console.log(`Server down due to: ${err}`);
});

// 404 pasar a un middleware

server.use((req, res, next) => {
    let error = new Error();
    error.message = "Resource Not Found";
    error.status = 404;
    next(error);
});

// General error handler
server.use((error, req, res, next) => {
    if (!error.status) error.status = 404;
    res
        .status(error.status)
        .json({ status: error.status, message: error.message });
});

