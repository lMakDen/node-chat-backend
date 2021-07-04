"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var models_1 = require("../models");
var utils_1 = require("../utils");
var express_validator_1 = require("express-validator");
var UserController = /** @class */ (function () {
    function UserController(io) {
        this.io = io;
    }
    UserController.prototype.index = function (req, res) {
        var id = req.params.id;
        models_1.UserModel.findById(id, function (err, user) {
            if (err) {
                return res.status(404).json({
                    message: 'not found'
                });
            }
            res.json(user);
        });
    };
    UserController.prototype.getMe = function (req, res) {
        var id = req.user._id;
        models_1.UserModel.findById(id, function (err, user) {
            if (err) {
                return res.status(404).json({
                    message: 'not found'
                });
            }
            res.json(user);
        });
    };
    UserController.prototype.create = function (req, res) {
        var postData = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password,
        };
        var user = new models_1.UserModel(postData);
        user.save()
            .then(function (obj) {
            console.log('then');
            res.json(obj);
        })
            .catch(function (error) {
            console.log('catch');
            res.json(error);
        });
    };
    UserController.prototype.remove = function (req, res) {
        var id = req.body.id;
        models_1.UserModel.findOneAndRemove({ _id: id }, function (err, user) {
            if (err) {
                return res.status(404).json({
                    message: 'user not found'
                });
            }
            res.json({
                message: "user " + (user ? user.fullName : '') + " removed"
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        var postData = {
            email: req.body.email,
            password: req.body.password,
        };
        var errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        models_1.UserModel.findOne({ email: postData.email }, function (err, user) {
            if (err) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            if (bcrypt_1.default.compareSync(postData.password, user.password)) {
                var token = utils_1.createJWToken(user);
                res.json({
                    status: "success",
                    token: token,
                });
            }
            else {
                res.status(403).json({
                    status: "error",
                    message: "Incorrect password or email",
                });
            }
        });
    };
    return UserController;
}());
exports.default = UserController;
