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

        check('email', 'Введите email').exists({checkFalsy: true}),
        check('name', 'Введите имя').exists({checkFalsy: true}),
        check('password', 'Введите пароль').exists({checkFalsy: true}),
        check('passwordRepeat', 'Введите пароль повторно').exists({checkFalsy: true}),

        check('email', 'Не корректный email').normalizeEmail().isEmail(),
        check('password', 'Минимальная длнна пароля 6 символов').isLength({min: 6}),
        check('passwordRepeat', 'Пароли не совподают').custom((value, {req}) => {

            return req.body.passwordRepeat.trim() === req.body.password.trim()
        })
    ],
    async (req, res) => {
        try {

            console.log('Body: ');
            console.dir(req.body)

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                errors.array().forEach(msg => console.log(msg));
                return res.status(400).json(
                    {
                        errors: errors.array(),
                        message: 'Некоректные данные'
                    })
            }
            const {email, password, name} = req.body;

            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'Такой email уже занят'})
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({email, password: hashedPassword, name})

            await user.save();
            res.status(201).json({message: 'Пользователь создан'})
        } catch (e) {
            res.status(500).json({error: e, message: 'Упс, что то пошло не так...'})
        }
    })


// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите email').exists({checkFalsy: true}),
        check('email', 'Не корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists({checkFalsy: true}),
        check('password', 'Минимальная длнна пароля 6 символов').isLength({min: 6}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                errors.array().forEach(msg => console.log(msg));
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