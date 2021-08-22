const mongoose = require('mongoose')

const Room = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }]
},
    { timestamps: true })

module.exports = mongoose.model('Room', Room)