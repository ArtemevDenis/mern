const {Router} = require('express')
const shortid = require('shortid')

const User = require('../models/User')
const config = require('config')
const authMiddleware = require('../middleware/auth.middleware')
const adminAuthMiddleware = require('../middleware/adminAuth.middleware')
const router = Router()


router.get('/admin/all', adminAuthMiddleware, async (req, res) => {
    try {
        const usersArr = [];
        await User.find({}, (err, users) => {
            users.forEach(link => usersArr.push(link))
        })
        res.json(usersArr)
    } catch (e) {
        res.status(500).json({message: 'Упс, что то пошло не так...'})
    }
})


router.get('/admin/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (e) {
        res.status(500).json({message: 'Упс, что то пошло не так...'})
    }
})


router.delete('/admin/:id', adminAuthMiddleware, async (req, res) => {
    try {
        const user = await User.deleteOne(req.params.id)
        res.json(user)
    } catch (e) {
        res.status(500).json({message: 'Упс, что то пошло не так...'})
    }
})

router.put('/admin/:id', adminAuthMiddleware, async (req, res) => {
    try {
        await User.findOneAndUpdate(req.params.id, req.body.newData, function (err, doc) {
            if (err)
                return res.status(500).json({message: err});
            return res.status(204).json({message: 'resource updated successfully'});
        })
    } catch (e) {
        res.status(500).json({message: 'Упс, что то пошло не так...'})
    }
})


module.exports = router