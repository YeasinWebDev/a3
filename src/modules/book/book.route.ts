import { Router } from "express";
import { createBook, deleteBookById, getAllBooks, getBookById, updateBookById } from "./book.controllers";


export const bookRoute = Router()

bookRoute.get("/", getAllBooks)
bookRoute.post("/", createBook)
bookRoute.get("/:bookId", getBookById)
bookRoute.put("/:bookId", updateBookById)
bookRoute.delete("/:bookId", deleteBookById)