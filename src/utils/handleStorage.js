const multer = require("multer");
// Creamos una constante con un metodo de multer de almacenamiento en disco, indicamos tres parametros, la request, un archivo, y un callback
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // dirname me lleva directamente a la carpeta en la que estoy ahora
        const pathStorage = `${__dirname}/../../public/storage`;
        cb(null, pathStorage);
    },
    filename: (req, file, cb) => {
        // Primero separo el nombre de la extencion (jpg ej) para cambiar el nombre y conservarlo
        const ext = file.originalname.split(".").pop();
        // Cambio el nombre de las imagenes por si llega a pasar que existan dos repetidas
        const filename = `usrPic_${Date.now()}.${ext}`;
        cb(null, filename);
    }
});

const uploadPic = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Chequeamos el tipo de la imagen
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            // Si no viene ninguno file.mymetype == " "
            !file
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Warning: .png, .jpg and .jpeg formate allowed"));
        }
    }
});

module.exports = uploadPic;