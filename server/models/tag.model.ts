import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
  tag: string;
}

const TagSchema: Schema = new Schema({
  tag: { type: String, required: true },
});

export default mongoose.model<ITag>("tags", TagSchema);
