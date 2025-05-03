import express from "express";
import bookController from "../controllers/book.controller.js";
import protect from "../middlewares/auth.middleware.js";
import requireAdmin from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/add-book", protect, requireAdmin, bookController.createBook);
router.get("/books", bookController.fetchbooks);
router.get("/:id", bookController.fetchBook);
router.delete("/:id", protect, requireAdmin, bookController.deleteBook);
router.put("/:id", protect, requireAdmin, bookController.updateBook);
router.get("/similar/:id", bookController.fetchSimilarBooks);
router.get("/search", bookController.searchBooks);

export default router;
