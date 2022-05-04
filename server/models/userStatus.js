const mongoose = require('mongoose');

const userStatusSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    status: {
        type: {
            type: String,
            enum: ['online', 'offline', 'busy', 'away'],
        },
        via: {
            type: String,
            enum: ['web', 'mobile', 'desktop'],
        },
        upadtedBy: {
            type: String,
            enum: ['discord', 'i-am-online-client'],
        },
        heartbeat: {
            key: {
                type: String,
            },
        }
    },
    lastSeen:{
        type: Date,
    },
    amIOnline : {
        type: Boolean,
    }    
},{
    timestamps: true
});

const UserStatus = mongoose.model('UserStatus', userStatusSchema);

module.exports =  UserStatus;