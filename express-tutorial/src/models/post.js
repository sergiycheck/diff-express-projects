import mongoose from "mongoose";
import { postModelName, authorModelName } from "./modelNames.js";

const { Schema, model } = mongoose;

const postSchema = new Schema({
  _id: mongoose.ObjectId,
  text: { type: String, required: true },
  owner: {
    type: mongoose.ObjectId,
    ref: authorModelName,
    required: true,
  },
});

const PostModel = model(postModelName, postSchema);

export { PostModel };
