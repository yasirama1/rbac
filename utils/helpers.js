const messages = require('../constants/messages').messages;

module.exports.ReE = function (res, message, code = 400) { // Error Web Response

    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json({ success: 0, error: message.message, data: {} });
};

module.exports.ReS = function (res, data, code = 200, message) { // Success Web Response
    let send_data = {};

    if (typeof data == 'object') {
        send_data.data = data//merge the objects
    }
    else {
        send_data.data = {}
    }
    if (typeof code !== 'undefined') res.statusCode = code;
    send_data.success = 1
    send_data.error = null
    send_data.message = message
    return res.json(send_data)
};
