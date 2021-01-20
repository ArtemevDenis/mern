const {Router} = require('express')
const shortid = require('shortid')

const Todo = require('../models/Todo')
const config = require('config')
const authMiddleware = require('../middleware/auth.middleware')
const adminAuthMiddleware = require('../middleware/adminAuth.middleware')
const router = Router()


router.get('/', authMiddleware, async (req, res) => {
    try {
        const todos = await Todo.find({owner: req.user.userID})
        res.json(todos)
    } catch (e) {
        res.status(500).json({message: 'Упс, что то пошло не так...'})
    }
})

router.post('/', authMiddleware,
    async (req, res) => {
        try {
            const todo = new Todo(req.body.newData)
            await todo.save()
            res.status(201).json({message: 'Тикет создан'})
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

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        let editTodo = Todo.findById(req.params.id)
        let userID = req.body.userID

        if (editTodo.owner.userID === userID) {
            await Todo.findOneAndUpdate(req.params.id, req.body.newData, function (err) {
                if (err)
                    return res.status(500).json({message: err});
                return res.status(204).json({message: 'resource updated successfully'});
            })
        }
        res.status(403).json({message: 'У вас нет прав...'})
    } catch (e) {
        res.status(500).json({message: 'Упс, что то пошло не так...'})
    }
})


module.exports = router