"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
exports.default = (function (req, res, next) {
    if (req.path === '/user/login' || req.path === '/user/registration') {
        return next();
    }
    var token = req.headers.token;
    utils_1.verifyJWToken(token).then(function (user) {
        req.user = user.data._doc;
        next();
    })
        .catch(function () {
        res.status(403).json({
            message: 'Invalid auth token provided.'
        });
    });
});
