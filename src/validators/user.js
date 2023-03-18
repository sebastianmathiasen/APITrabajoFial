const { check, validationResult } = require("express-validator");

const createUser = [
    check("fullName")
        .trim()
        .notEmpty()
        .withMessage("Field cannot be empty")
        .isAlpha("es-ES", { ignore: " " }) //Cuidado con los espacios que son necesarios
        .isLength({ min: 5, max: 90 })
        .withMessage("Character count: min 5, max 90"),
    check("userName")
        .trim()
        .notEmpty()
        .withMessage("Field cannot be empty"),
    check("email")
        .trim()
        .notEmpty()
        .withMessage("Field cannot be empty")
        .isEmail()
        .withMessage("Must be a valid email address")
        .normalizeEmail(),
    check("password")
        .trim()
        .notEmpty()
        .withMessage("Field cannot be empty")
        .isLength({ min: 8, max: 16 })
        .withMessage("Character count: min: 8, max: 16"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        } else {
            return next();
        }
    }
];

const resetPassword = [
    check("password")
        .exists()
        .isLength({ min: 8, max: 16 })
        .withMessage("Between 8 a 16 characters")
        .trim(),
    (req, res, next) => {
        const token = req.params.token;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const arrWarnings = errors.array()
            res.render("reset", { arrWarnings, token })
        } else {
            return next();
        }
    }
];

module.exports = { createUser, resetPassword };