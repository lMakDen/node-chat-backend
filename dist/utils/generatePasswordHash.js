"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = (function (password) {
    return new Promise(function (resolve, reject) {
        bcrypt_1.default.genSalt(function (err, salt) {
            if (err)
                return reject(err);
            bcrypt_1.default.hash(password, 10, function (err, hash) {
                if (err)
                    return reject(err);
                resolve(hash);
            });
        });
    });
});
