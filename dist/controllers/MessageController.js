"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var MessageController = /** @class */ (function () {
    function MessageController(io) {
        this.io = io;
    }
    MessageController.prototype.index = function (req, res) {
        var dialogId = req.query.dialog;
        models_1.MessageModel.find({ dialog: dialogId })
            .populate(['dialog'])
            .exec(function (err, messages) {
            if (err) {
                return res.status(404).json({
                    message: 'Messages not found',
                });
            }
            return res.json(messages);
        });
    };
    MessageController.prototype.create = function (req, res) {
        var userId = req.user._id;
        var postData = {
            text: req.body.text,
            user: userId,
            dialog: req.body.dialog_id,
        };
        var message = new models_1.MessageModel(postData);
        message.save()
            .then(function (obj) {
            res.json(obj);
        })
            .catch(function (error) {
            res.json(error);
        });
    };
    MessageController.prototype.remove = function (req, res) {
        var id = req.params.id;
        models_1.MessageModel.findOneAndRemove({ _id: id })
            .then(function (message) {
            if (message) {
                res.json({
                    message: 'Message was deleted'
                });
            }
        })
            .catch(function () {
            res.json({
                message: 'Message not found'
            });
        });
    };
    return MessageController;
}());
exports.default = MessageController;
