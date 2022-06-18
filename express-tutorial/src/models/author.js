import mongoose from "mongoose";
import { postModelName, authorModelName } from "./modelNames.js";

const { Schema, model } = mongoose;

const authorSchema = new Schema({
  _id: mongoose.ObjectId,
  name: { type: String, required: true },
  posts: [
    {
      type: mongoose.ObjectId,
      ref: postModelName,
    },
  ],
});

const AuthorModel = model(authorModelName, authorSchema);

export { AuthorModel };
