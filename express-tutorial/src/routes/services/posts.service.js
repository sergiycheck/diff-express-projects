import { PostModel } from "../../models/post.js";

const getPostsList = async () => {
  const postDocs = await PostModel.find().exec();

  return {
    count: postDocs.length,
    posts: postDocs.map((doc) => ({
      id: doc._id,
      name: doc.text,
      owner: doc.owner,
    })),
  };
};

const getPostsByAuthorId = async ({ authorId }) => {
  const postDocs = await PostModel.where("owner").equals(authorId).exec();

  return {
    count: postDocs.length,
    posts: postDocs.map((doc) => ({
      id: doc._id,
      name: doc.text,
      owner: doc.owner,
    })),
  };
};

export { getPostsList, getPostsByAuthorId };
