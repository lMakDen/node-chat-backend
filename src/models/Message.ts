import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';

export interface IMessage extends Document {
  text: {
    type: string,
    require: boolean,
  };
  dialog: {
    type: Schema.Types.ObjectId,
    ref: string,
    require: boolean,
  };
  user: {
    type: Schema.Types.ObjectId,
    ref: string,
    require: boolean,
  };
  isRead: {
    type: boolean,
    default: boolean,
  };
}

const MessageSchema = new Schema({
    text: { type: String, require: Boolean },
    dialog: { type: Schema.Types.ObjectId, ref: 'Dialog', require: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    isRead: {
      type: Boolean,
      default: false,
    },
    attachments: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  },
  {
    timestamps: true,
    usePushEach: true,
  }
)

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;