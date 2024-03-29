import mongoose, { Schema, Document } from 'mongoose';

export interface IDialog extends Document {
  author: {
    type: Schema.Types.ObjectId,
    ref: string,
    require: true,
  };
  partner: {
    type: Schema.Types.ObjectId,
    ref: string,
    require: true,
  };
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: string,
  };
}

const DialogSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    partner: { type: Schema.Types.ObjectId, ref: 'User' },
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  },
  {
    timestamps: true,
  }
)

const DialogModel = mongoose.model<IDialog>('Dialog', DialogSchema);

export default DialogModel;