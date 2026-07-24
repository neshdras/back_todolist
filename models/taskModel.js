const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'The title is required']
        },
        limit: {
            type: Date,
            required: [true, 'The limit date is required']
        },
        status: {
            type: String,
            required: [true, 'The title is required'],
            enum: ["To do", "Doing", "Done"],
            default: "To do"
        },
        human: {
            type: String, 
            required: false
        }
    }
)

module.exports = mongoose.model('Task', taskSchema)