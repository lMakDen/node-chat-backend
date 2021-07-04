"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var middlewares_1 = require("../middlewares");
var controllers_1 = require("../controllers");
var validators_1 = require("../utils/validators");
exports.default = (function (app, io) {
    var UserController = new controllers_1.UserCtrl(io);
    var DialogController = new controllers_1.DialogCtrl(io);
    var MessageController = new controllers_1.MessageCtrl(io);
    app.use(body_parser_1.default.json());
    app.use(middlewares_1.updateLastSeen);
    app.use(middlewares_1.checkAuth);
    app.get('/user/:me', UserController.getMe);
    app.get('/user/:id', UserController.index);
    app.post('/user/registration', UserController.create);
    app.delete('/user/remove', UserController.remove);
    app.post('/user/login', validators_1.loginValidation, UserController.login);
    app.get('/dialogs', DialogController.index);
    app.post('/dialogs', DialogController.create);
    app.delete('/dialogs/:id', DialogController.remove);
    app.get('/messages', MessageController.index);
    app.post('/messages', MessageController.create);
    app.delete('/messages/:id', MessageController.remove);
});
