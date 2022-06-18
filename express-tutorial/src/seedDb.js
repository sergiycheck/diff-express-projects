import debug from "debug";
import { AuthorModel } from "./models/author.js";
import { PostModel } from "./models/post.js";

const log = debug("log");

const seedDb = async (mongoose) => {
  const authorDocs = await AuthorModel.find().exec();
  if (authorDocs.length < 2) {
    try {
      const authors = await AuthorModel.create([
        {
          _id: new mongoose.Types.ObjectId(),
          name: "AuthorName1",
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "AuthorName2",
        },
      ]);

      const posts = await PostModel.create([
        {
          _id: new mongoose.Types.ObjectId(),
          text: `post text 1`,
          owner: authors[0]._id,
        },
        {
          _id: new mongoose.Types.ObjectId(),
          text: `post text ${getRandomInt(0, 100)}`,
          owner: authors[0]._id,
        },
        {
          _id: new mongoose.Types.ObjectId(),
          text: `post text 2`,
          owner: authors[1]._id,
        },
        {
          _id: new mongoose.Types.ObjectId(),
          text: `post text ${getRandomInt(0, 100)}`,
          owner: authors[1]._id,
        },
        {
          _id: new mongoose.Types.ObjectId(),
          text: `post text ${getRandomInt(0, 100)}`,
          owner: authors[1]._id,
        },
      ]);

      posts.forEach(async (post) => {
        await AuthorModel.findByIdAndUpdate(
          post.owner,
          { $push: { posts: post._id } },
          { new: true }
        );
      });
    } catch (error) {
      log("an error occured ", error);
    }
  }
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export default seedDb;
