const { check, validationResult } = require("express-validator");

const createPost = [
    check("historicalFact")
        .trim()
        .notEmpty()
        .withMessage("Field cannot be empty")
        .isAlpha("es-ES", { ignore: " " }) //Cuidado con los espacios que son necesarios
        .isLength({ min: 5, max: 90 })
        .withMessage("Character count: min 5, max 90"),
    check("hero")
        .trim()
        .notEmpty()
        .withMessage("Field cannot be empty"),
    check("villain")
        .trim()
        .notEmpty()
        .withMessage("Field cannot be empty"),
    check("fictionalWay")
        .trim()
        .notEmpty()
        .withMessage("Field cannot be empty"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        } else {
            return next();
        }
    }
];

module.exports = { createPost };