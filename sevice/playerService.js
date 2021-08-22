const PlayerRepo = require('../repository/playerRepo');
const RoomRepo = require('../repository/roomRepo');
const { ReE, ReS } = require('../utils/helpers.js');

module.exports = class PlayerService {
    static async getPlayers(req, res) {
        try {
            const players = await PlayerRepo.getPlayers(req.body)
            ReS(res, players);
        } catch (error) {
            ReE(res, error, 500)
        }
    }
    static async addPlayer(req, res) {
        try {
            await PlayerRepo.addPlayer(req.body);
            const players = await PlayerRepo.getPlayers()
            ReS(res, players)
        } catch (error) {
            ReE(res, error, 500)
        }

    }
    static async deletePlayer(req, res) {
        try {
            await PlayerRepo.deletePlayer(req.params.id);
            const players = await PlayerRepo.getPlayers()
            const rooms = await RoomRepo.getRooms()
            ReS(res,{players: players, rooms: rooms})
        } catch (error) {
            ReE(res, error, 500)
        }

    }
}