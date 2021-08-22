const mongoose = require('mongoose')

const Player = mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Number,
        required: true,
        default: 1,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Player', Player)