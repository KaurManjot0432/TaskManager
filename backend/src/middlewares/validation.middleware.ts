const { body } = require('express-validator')

export const validateUser = [
    body('firstName', 'Enter a valid name').isLength({ min: 3 }),
    body('lastName', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
];

export const validateSignin = [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank!').isLength({ min: 1 })
];

export const validateTask = [
    body('title', 'Title could not be empty').isLength({ min: 1 }),
    body('description', 'Enter some description').isLength({ min: 1 })
]