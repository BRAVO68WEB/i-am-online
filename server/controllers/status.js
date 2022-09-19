const keys = require("../config/keys");
const UserStatus = require("../models/userStatus");
const {
    format
} = require("date-format-parse")
const {
    customAlphabet
} = require("nanoid");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

// Not used
// module.exports.getUserStatus = async (req, res, next) => {
//     const userStatus = await UserStatus.findOne({
//         username: req.params.username
//     });
//     res.json({
//         userStatus
//     });
// }

module.exports.checkStatus = async (req, res, next) => {
    const userStatus = await UserStatus.findOne({
        username: req.params.username
    });
    var lastPingTs = (format(userStatus?.lastSeen, "x"));
    var currentTs = (format(new Date(), "x"));
    // var diff = currentTs - lastPingTs;
    // console.log(diff/60000);
    if (currentTs - lastPingTs > 240000) {
        const updateUserStatusUpdt = await UserStatus.findOneAndUpdate({
            username: req.params.username
        }, {
            amIOnline: false,
            status: {
                type: "offline",
                updatedBy: "i-am-online-server",
                via: "web",
                heartbeat: {
                    key: null
                }
            },
            lastSeen: userStatus.lastSeen
        });
        res.json({
            updateUserStatusUpdt
        });
    } else {
        const updateUserStatusUpdt =  await UserStatus.findOneAndUpdate({
            username: req.params.username
        }, {
            amIOnline: true,
            status: {
                type: "online",
                updatedBy: "i-am-online-client",
                via: "desktop",
                heartbeat: {
                    key: "self"
                }
            },
            lastSeen: userStatus.lastSeen
        });
        res.json({
            updateUserStatusUpdt
        });
    }
}

module.exports.reportUserStatus = async (req, res, next) => {
    if(req.query.auth != keys.pingAuthKey){
        return res.json({
            error: "Invalid auth key"
        });
    }
    const checkIfUserExists = await UserStatus.findOne({
        username: req.params.username
    });
    if (checkIfUserExists) {
        const updateUserStatus = await UserStatus.findOneAndUpdate({
            username: req.params.username
        }, {
            status: {
                type: "online",
                updatedBy: "i-am-online-client",
                via: "desktop",
                heartbeat: {
                    key: nanoid(),
                },
            },
            amIOnline: true,
            lastSeen: new Date()
        }, {
            new: true
        });
        res.json({
            updateUserStatus
        });
    } else {
        const userStatus = new UserStatus({
            username: req.params.username,
            status: {
                type: "online",
                via: "desktop",
                updatedBy: "i-am-online-client",
                heartbeat: {
                    key: nanoid(),
                },
            amIOnline: true,
            lastSeen: new Date()
            },
        });
        await userStatus.save();
        res.json({
            userStatus
        });
    }
};