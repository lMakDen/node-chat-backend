"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var validator_1 = __importDefault(require("validator"));
var utils_1 = require("../utils");
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        require: 'Email address is required',
        validate: [validator_1.default.isEmail, 'Invalid email'],
        unique: true
    },
    fullName: {
        type: String,
        require: 'FullName address is required',
    },
    password: {
        type: String,
        require: 'Password address is required',
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    avatar: String,
    confirm_hash: String,
    last_seen: {
        type: Date,
        default: new Date()
    }
}, {
    timestamps: true,
});
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();
    utils_1.generatePasswordHash(user.password)
        .then(function (hash) {
        user.password = hash;
        next();
    }).catch(function (err) {
        next(err);
    });
});
var UserModel = mongoose_1.default.model('User', UserSchema);
exports.default = UserModel;
