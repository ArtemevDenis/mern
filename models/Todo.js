const {Schema, model, Types} = require('mongoose')


const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    beforeTime: {type: Date, required: true},
    status: {type: String, required: true, default: 'planned'}, //'planned', 'in progress' ,'done'
    inArchive: {type: Boolean, required: true, default: false},
    finishTime: {type: Date},
    importance: {type: Number, max: 10, min: 0, required: true, default: 5},

    owner: {type: Types.ObjectId, ref: 'User'},
})

module.exports = model('Todo', schema)