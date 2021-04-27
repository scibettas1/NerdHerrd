const mongoose= require('mongoose');
const db= require("../models");


const addFirstThread= (data) => {
    console.log("updating");
    db.User.updateOne({
        displayName: data.user
    }, {
        $push: {
            threads: {
                user: data.otherUser,
                room: data.room,
                subject: "enter a subject"
            }
        }
    }).then(res => console.log(res))
    .catch(err => console.error(err));
}

const addSecondThread= (data) => {
    console.log("updating pt.2");
    db.User.updateOne({
        displayName: data.otherUser
    }, {
        $push: {
            threads: {
                user: data.user,
                room: data.room,
                subject: "enter a subject"
            }
        }
    }).then(res => console.log(res))
    .catch(err => console.error(err));
}

const addChatData= (data) => {
    db.Chat.create({
        roomname: data.room
    }).then(res => console.log(res))
    .catch(err => console.error(err));
}

module.exports= {

    writeMessage: (room, user, msg) => {
        db.Chat.updateOne({
            roomname: room
        },
        {
            $push: {
                messages: {
                    user: user,
                    msg: msg
                }
            }
        })
        .then(data => console.log(data))
        .catch(err => console.error(err))
    },
    findUser: (user, cb) => {
        db.User.findOne({
            displayName: user
        })
        .then(data => cb(data))
        .catch(err => console.error(err))
    },
    findRoom: (room, cb) => {
        db.Chat.findOne({
            roomname: room
        })
        .then(data => cb(data))
        .catch(err => console.error(err))
    },
    updateSubject: (subject, room) => {
        console.log("updating subject!");
        db.User.updateMany(
            {'threads.room': room }, {
                $set: {
                    'threads.$.subject':  subject,
                }
            })
            .then(data => console.log(data))
            .catch(err => console.error(err));
    },
    check: (req, res) => {
        console.log(req.body);
        db.User.findOne({
            $and: [{displayName: req.body.user}, {'threads.user': req.body.otherUser}]
            })
            .then(data => {
                if (data) {
                    console.log("already exists!");
                } else {
                    addFirstThread(req.body);
                    addSecondThread(req.body);
                    addChatData(req.body);
                }
            })
    }
}