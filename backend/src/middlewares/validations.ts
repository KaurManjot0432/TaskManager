const { body } = require('express-validator')

export const validateUser = [
    body('firstName', 'Enter a valid name').isLength({ min: 3 }),
    body('lastName', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
];

export const validateSignin = [
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password can not be blank!').isLength({ min : 1 })
];