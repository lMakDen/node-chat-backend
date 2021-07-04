"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var MessageSchema = new mongoose_1.Schema({
    text: { type: String, require: Boolean },
    dialog: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Dialog', require: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', require: true },
    unread: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
var MessageModel = mongoose_1.default.model('Message', MessageSchema);
exports.default = MessageModel;
