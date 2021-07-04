"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
exports.default = (function (req, res, next) {
    models_1.UserModel.findOneAndUpdate({ _id: '5e6e64627c51b003b03a4ca0' }, {
        last_seen: new Date(),
    }, { new: true }, function () { });
    next();
});
