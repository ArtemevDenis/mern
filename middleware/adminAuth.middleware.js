const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')


module.exports = async (req, res, next) => {

    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            res.status(401).json({message: "Нет авторизации"})
        }

        req.user = jwt.verify(token, config.get('jwtSecret'))
        console.log(req.user)

        let user = await User.findById(req.user.userID)

        if (!user) {
            console.log('ups')
        }
        console.log(user)

        let role = user.role;
        if (role === 'admin')
            next()
        else
            res.status(403).json({message: "Недостаточно прав"})

    } catch (e) {

        res.status(401).json({message: "Нет авторизации"})
    }
}