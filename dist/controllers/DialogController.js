"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var DialogController = /** @class */ (function () {
    function DialogController(io) {
        this.io = io;
    }
    DialogController.prototype.index = function (req, res) {
        var authorId = req.user._id;
        models_1.DialogModel.find({ author: authorId })
            .populate(['author', 'partner'])
            .exec(function (err, dialogs) {
            if (err) {
                return res.status(404).json({
                    message: 'Dialogs not found',
                });
            }
            return res.json(dialogs);
        });
    };
    DialogController.prototype.create = function (req, res) {
        var postData = {
            author: req.body.author,
            partner: req.body.partner,
        };
        var dialog = new models_1.DialogModel(postData);
        dialog.save()
            .then(function (dialogObj) {
            var message = new models_1.MessageModel({
                text: req.body.text,
                user: req.body.author,
                dialog: dialogObj._id,
            });
            message.save().then(function () {
                res.json(dialogObj);
            }).catch(function (error) {
                res.json(error);
            });
        })
            .catch(function (error) {
            res.json(error);
        });
    };
    DialogController.prototype.remove = function (req, res) {
        var id = req.params.id;
        models_1.DialogModel.findOneAndRemove({ _id: id }, function (err) {
            if (err) {
                return res.status(404).json({
                    message: 'user not found'
                });
            }
            res.json({
                message: "dialog removed"
            });
        });
    };
    return DialogController;
}());
exports.default = DialogController;
