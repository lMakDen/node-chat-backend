import mongoose, { Schema, Document } from 'mongoose';

export interface IFile extends Document {
  fileName: string;
  size: number;
  ext: string;
  url: string;
  message: string;
  user: string;
}

const FileSchema = new Schema({
    fileName: String,
    size: Number,
    ext: String,
    url: String,
    message: { type: Schema.Types.ObjectId, ref: 'Message', require: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
}, {
  timestamps: true,
  }
)

const FileModel = mongoose.model<IFile>('File', FileSchema);

export default FileModel;