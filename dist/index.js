"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
// @ts-ignore
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = require("http");
require("./core/db");
var routes_1 = __importDefault(require("./core/routes"));
var app = express_1.default();
var http = http_1.createServer(app);
var io = socket_io_1.default(http);
dotenv_1.default.config();
routes_1.default(app, io);
io.on('connection', function (socket) {
    console.log('CONNECTED!');
    socket.emit('test_command', "HELLO WORLD");
    socket.on('get_server_msg', function (msg) {
        console.log('message:', msg);
    });
});
http.listen(process.env.PORT, function () {
    console.log("Example app listening on port " + process.env.PORT + "!");
});
