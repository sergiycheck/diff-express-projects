import express from "express";
import { getAuthorsList, getAuthorById, createAuthor, deleteAuthor, updateAuthor } from "./services/authors.service.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const authorsListRes = await getAuthorsList();

    res.status(200).json({
      ...authorsListRes,
      request: {
        type: "GET",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:authorId", async (req, res, next) => {
  const authorId = req.params.authorId.trim();

  try {
    const authorRes = await getAuthorById(authorId);

    res.status(200).json({
      ...authorRes,
      request: {
        type: "GET",
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name } = req.body;

  try {
    const createdAuthorResult = await createAuthor({ name });

    res.status(201).json({
      message: "Author created successfully",
      ...createdAuthorResult,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.delete("/:authorId", async (req, res, next) => {
  const authorId = req.params.authorId.trim();

  try {
    const deleteResult = await deleteAuthor(authorId);

    if (deleteResult.deletedCount) {
      res.status(200).json({
        message: "author was deleted",
        deleteResult,
      });
    } else {
      const error = new Error(`author with id ${authorId} was not found`);
      error.status = 400;
      next(error);
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.put("/:authorId", async (req, res, next) => {
  const { authorId } = req.params;
  const { name } = req.body;

  try {
    const updateResult = await updateAuthor({ authorId, name });

    res.status(200).json({
      message: `author with id ${authorId} was updated successfully`,
      updateCount: updateResult.modifiedCount,
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

export default router;
