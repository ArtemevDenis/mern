const {Router} = require('express')
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Не корректный email').isEmail(),
        check('password', 'Минимальная длнна пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try {

            console.dir('Body:' + req.body);

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json(
                    {
                        errors: errors.array(),
                        message: 'Некоректные данные'
                    })
            }
            const {email, password} = req.body;

            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'Такой email уже занят'})
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({email, password: hashedPassword})

            await user.save();
            res.status(201).json({message: 'Пользователь создан'})
        } catch (e) {
            res.status(500).json({message: 'Упс, что то пошло не так...'})
        }
    })


// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Не корректный email').normalizeEmail().isEmail(),
        check('email', 'Введите email').exists(),
        check('password', 'Минимальная длнна пароля 6 символов').isLength({min: 6}),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json(
                    {
                        errors: errors.array(),
                        message: 'Некоректные данные при входе'
                    })
            }
            const {email, password} = req.body;

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Не верный пароль'})
            }


            const token = jwt.sign(
                {userID: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userID: user.id})

        } catch (e) {
            res.status(500).json({message: 'Упс, что то пошло не так...'})
        }
    })

module.exports = router;