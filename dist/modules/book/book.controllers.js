"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookById = exports.updateBookById = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = require("./book.model");
const createBook = async (req, res) => {
    try {
        const book = await book_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                error,
            });
        }
        res.status(500).json({
            success: false,
            message: "Failed to create book",
            error: error,
        });
    }
};
exports.createBook = createBook;
const getAllBooks = async (req, res) => {
    try {
        const genre = req.query.filter;
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sort === "desc" ? -1 : 1;
        let limit = 10;
        if (req.query.limit) {
            const parsedLimit = parseInt(req.query.limit);
            if (!isNaN(parsedLimit) && parsedLimit > 0) {
                limit = parsedLimit;
            }
        }
        const filter = {};
        if (genre) {
            filter.genre = genre;
        }
        const books = await book_model_1.Book.find(filter)
            .sort({ [sortBy]: sortOrder })
            .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch books",
            error,
        });
    }
};
exports.getAllBooks = getAllBooks;
const getBookById = async (req, res) => {
    console.log(req.params.bookId);
    try {
        const book = await book_model_1.Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch book",
            error: error,
        });
    }
};
exports.getBookById = getBookById;
const updateBookById = async (req, res) => {
    try {
        const book = await book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update book",
            error: error,
        });
    }
};
exports.updateBookById = updateBookById;
const deleteBookById = async (req, res) => {
    try {
        const book = await book_model_1.Book.findByIdAndDelete(req.params.bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete book",
            error: error,
        });
    }
};
exports.deleteBookById = deleteBookById;
