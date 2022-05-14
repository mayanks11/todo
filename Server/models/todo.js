const mongoose = require('mongoose');

// create schema
const TodoItemSchema = new mongoose.Schema({
    item: {
        type: String
    }
})


const todo = mongoose.model('todo', TodoItemSchema);

module.exports=todo;
