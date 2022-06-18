import express from "express";
import { getPostsList, getPostsByAuthorId } from "./services/posts.service.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const postsListResult = await getPostsList();

    res.status(200).json({
      ...postsListResult,
      request: {
        type: "GET",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/by-author-id/:authorId", async (req, res, next) => {
  const { authorId } = req.params;

  try {
    const postsListResult = await getPostsByAuthorId({ authorId });

    res.status(200).json({
      ...postsListResult,
      request: {
        type: "GET",
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
