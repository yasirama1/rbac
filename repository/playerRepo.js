const { messages } = require('../constants/messages');
const Player = require('../model/playerModel')
const Room = require('../model/roomModel')

module.exports = class PlayerRepo {
    static async getPlayers(query) {
        try {
            const players = await query == null ? Player.find({}).sort({ createdAt: 1 }).populate('room') : Player.find(query).populate('room');
            return players;
        } catch (error) {
            console.log(error.message)
            throw messages['something_went_wrong']
        }
    }

    static async getPlayerRoom(id) {
        try {
            let player = await Player.findById(id).populate('room')
            return player.room
        } catch (error) {
            console.log(error.message)
            throw messages['something_went_wrong']
        }
    }

    static async addPlayer(player) {
        try {
            let playerWithSameName = await Player.findOne({ nickname: player.nickname })
            if (playerWithSameName) {
                throw { message: messages['name_taken'] }
            }
            await Player.create(player)
            return true
        } catch (error) {
            console.log(error)
            throw error
        }

    }
    static async deletePlayer(playerId) {
        try {
            await Player.deleteOne({ _id: playerId })
            await Room.updateMany(
                {},
                { $pull: { players: playerId } },
                { multi: true }
            )
            return true
        } catch (error) {
            console.log(error.message)
            throw messages['something_went_wrong']
        }

    }
}