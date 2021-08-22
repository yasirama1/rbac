const Room = require('../model/roomModel')
const Player = require('../model/playerModel');
const { playerStatus } = require('../constants/mappings');
const { messages } = require('../constants/messages');

module.exports = class RoomRepo {
    static async getRooms() {
        try {
            const rooms = await Room.find()
                .populate('players');
            return rooms;
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    static async addRoom(room) {
        try {
            let roomWithSameName = await Room.findOne({ name: room.name })
            if (roomWithSameName) {
                throw { message: messages['name_taken'] }
            }
            let roomCreated = await Room.create({ name: room.name })
            if (room.players) {
                for (const playerId of room.players) {
                    await this.addPlayers({
                        playerIds: [playerId],
                        roomId: roomCreated.id
                    })
                }
                // await room.players.forEach(async playerId => {
                // });
            }
            return true
        } catch (error) {
            console.log(error)
            throw error
        }

    }
    static async deleteRoom(roomId) {
        try {
            await Room.deleteOne({ _id: roomId })
            await Player.updateMany(
                { room: roomId },
                { $unset: { room: "" }, status: playerStatus.idle },
                { multi: true }
            )
            return true
        } catch (error) {
            console.log(error)
            throw error
        }

    }
    static async deletePlayer(data) {
        try {
            await Player.updateOne(
                { _id: data.playerId },
                { $unset: { room: "" }, status: playerStatus.idle },
            )
            await Room.updateOne(
                { _id: data.roomId },
                { $pull: { players: data.playerId } },
                { multi: true }
            )
            return true
        } catch (error) {
            console.log(error)
            throw error
        }

    }
    static async addPlayers(data) {
        try {
            for (var index = 0; index < data.playerIds.length; index++) {
                await Player.updateOne(
                    { _id: data.playerIds[index] },
                    { room: data.roomId, status: playerStatus.inRoom },
                )
              }
            await Room.updateOne(
                { _id: data.roomId },
                { $addToSet: { players: data.playerIds } },
            )
            return true
        } catch (error) {
            console.log(error)
            throw error
        }

    }

}