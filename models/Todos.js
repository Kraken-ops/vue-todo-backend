const mongoose = require('mongoose')
const TodosSchema = new mongoose.Schema({
    id: Number,
    text: String,
    done: Boolean
})

module.exports = mongoose.model('todo',TodosSchema)