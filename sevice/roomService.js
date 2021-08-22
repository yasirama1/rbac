const RoomRepo = require('../repository/roomRepo')
const PlayerRepo = require('../repository/playerRepo')
const { ReE, ReS } = require('../utils/helpers.js');

module.exports = class RoomService {
    static async getRooms(req, res) {
        try {
            const rooms = await RoomRepo.getRooms(req.body);
            ReS(res, rooms)
        } catch (error) {
            ReE(res, error, 500)
        }
    }
    static async addRoom(req, res) {
        try {
            await RoomRepo.addRoom(req.body);
            const players = await PlayerRepo.getPlayers()
            const rooms = await RoomRepo.getRooms()
            ReS(res, {players: players, rooms: rooms})
        } catch (error) {
            ReE(res, error, 500)
        }

    }
    static async deleteRoom(req, res) {
        try {
            await RoomRepo.deleteRoom(req.params.id);
            const players = await PlayerRepo.getPlayers()
            const rooms = await RoomRepo.getRooms()
            ReS(res, {players: players, rooms: rooms})
        } catch (error) {
            ReE(res, error, 500)
        }

    }
    static async deletePlayer(req, res) {
        try {
            await RoomRepo.deletePlayer(req.params);
            const players = await PlayerRepo.getPlayers()
            const rooms = await RoomRepo.getRooms()
            ReS(res, {players: players, rooms: rooms})
        } catch (error) {
            ReE(res, error, 500)
        }

    }
    static async addPlayers(req, res) {
        try {
            await RoomRepo.addPlayers(req.body);
            const players = await PlayerRepo.getPlayers()
            const rooms = await RoomRepo.getRooms()
            ReS(res, {players: players, rooms: rooms})
        } catch (error) {
            ReE(res, error, 500)
        }

    }
}