const {Schema, model, Types} = require('mongoose')


const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, required: true, default: 'user'},

    links: [{type: Types.ObjectId, ref: 'Link'}],
    todos: [{type: Types.ObjectId, ref: 'Todo'}],
})

module.exports = model('User', schema)