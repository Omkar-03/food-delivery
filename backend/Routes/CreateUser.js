const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

router.post("/createuser",

    [body('name').isLength({ min: 2 }),
    body('email', 'Invalid Email !!!').isEmail(),
    body('password', 'Incorrect Password !!!').isLength({ min: 5 })],

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bycrypt.genSalt(10)
        let passwordHash = await bycrypt.hash(req.body.password, salt)

        try {
            await User.create({
                name: req.body.name,
                password: passwordHash,
                email: req.body.email,
                location: req.body.location
            })

            res.json({ success: true });
        } catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    })

router.post("/loginuser",

    [body('email', 'Invalid Email !!!').isEmail(),
    body('password', 'Incorrect Password !!!').isLength({ min: 5 })],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email
        try {
            let userData = await User.findOne({ email })

            if (!userData) {
                return res.status(400).json({ errors: "Invalid Credentials !!!" })
            }

            const pwdCompare = await bycrypt.compare(req.body.password, userData.password)

            if (!pwdCompare) {
                return res.status(400).json({ errors: "Invalid Credentials !!!" })
            }

            const data = {
                user: {
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret)

            return res.json({ success: true, authToken: authToken })
        } catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    })

module.exports = router; 