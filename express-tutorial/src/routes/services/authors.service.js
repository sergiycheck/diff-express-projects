import { AuthorModel } from "../../models/author.js";
import mongoose from "mongoose";

const getAuthorsList = async () => {
  const authorDocs = await AuthorModel.find().exec();

  return {
    count: authorDocs.length,
    authors: authorDocs.map((doc) => ({
      id: doc._id,
      name: doc.name,
      postsCount: doc.posts.length,
    })),
  };
};

const getAuthorById = async (authorId) => {
  const authorDoc = await AuthorModel.findById(authorId)
    .populate({ path: "posts", select: "_id text owner" })
    .exec();

  return {
    author: {
      id: authorDoc._id,
      name: authorDoc.name,
      posts: authorDoc.posts.map((postDoc) => ({
        id: postDoc._id,
        text: postDoc.text,
        owner: postDoc.owner,
      })),
    },
  };
};

const createAuthor = async ({ name }) => {
  const author = new AuthorModel({
    _id: new mongoose.Types.ObjectId(),
    name: name,
  });

  const createdAuthor = await author.save();

  return {
    createdAuthor: {
      id: createdAuthor._id,
      name: createdAuthor.name,
    },
  };
};

const deleteAuthor = async (authorId) => {
  const deleteResult = await AuthorModel.deleteOne({ _id: authorId });
  return deleteResult;
};

const updateAuthor = async ({ authorId, name }) => {
  const updateResult = await AuthorModel.findOneAndUpdate(
    { _id: authorId },
    { name },
    { runValidators: true }
  );
  return updateResult;
};

export { getAuthorsList, getAuthorById, createAuthor, deleteAuthor, updateAuthor };
