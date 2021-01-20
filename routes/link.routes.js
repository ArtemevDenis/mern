const {Router} = require('express')
const shortid = require('shortid')

const Link = require('../models/Link')
const config = require('config')
const authMiddleware = require('../middleware/auth.middleware')
const adminAuthMiddleware = require('../middleware/adminAuth.middleware')
const router = Router()


router.post('/generate', authMiddleware, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const {from} = req.body

        const code = shortid.generate()
        const existing = await Link.findOne({from})
        if (existing) {
            return res.json({link: existing})
        }

        const to = baseUrl + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userID
        })

        await link.save()

        res.status(201).json(link)
    } catch (e) {
        res.status(500).json({message: 'Упс, что то пошло не так...'})
    }
})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userID})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Упс, что то пошло не так...'})
    }
})


router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({message: 'Упс, что то пошло не так...'})
    }
})


//===============================
//          ADMIN BLOCK
//===============================


router.get('/admin/all', adminAuthMiddleware, async (req, res) => {
    try {
        const linkArr = [];
        await Link.find({}, (err, links) => {
            links.forEach(link => linkArr.push(link))
        })
        res.json(linkArr)
    } catch (e) {
        res.status(500).json({message: 'Упс, что то пошло не так...'})
    }
})


router.get('/admin/byUser/:userID', adminAuthMiddleware, async (req, res) => {
    try {
        const links = await Link.find({owner: req.params.userID})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Упс, что то пошло не так...'})
    }
})


module.exports = router