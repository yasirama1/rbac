const express = require('express')

const router = express.Router()

const RoomRepo = require('./sevice/roomService')
const PlayerRepo = require('./sevice/playerService')
router.get('/players', PlayerRepo.getPlayers)
router.post('/player', PlayerRepo.addPlayer)
router.delete('/player/:id', PlayerRepo.deletePlayer)
router.get('/rooms', RoomRepo.getRooms)
router.post('/room', RoomRepo.addRoom)
router.delete('/room/:id/', RoomRepo.deleteRoom)
router.post('/room/players', RoomRepo.addPlayers)
router.delete('/room/:roomId/player/:playerId', RoomRepo.deletePlayer)

module.exports = router