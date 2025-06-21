"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBooks = exports.borrowBook = void 0;
const book_model_1 = require("../book/book.model");
const borrow_model_1 = require("./borrow.model");
const borrowBook = async (req, res) => {
    const { book, quantity } = req.body;
    const bookToBorrow = await book_model_1.Book.findById(book);
    if (!bookToBorrow) {
        return res.status(404).json({
            success: false,
            message: "Book not found",
        });
    }
    if (!bookToBorrow?.available) {
        return res.status(400).json({
            success: false,
            message: "Book not available",
        });
    }
    if (bookToBorrow.copies < quantity) {
        return res.status(400).json({
            success: false,
            message: `Only ${bookToBorrow.copies} copies available`,
        });
    }
    bookToBorrow.copies -= quantity;
    await bookToBorrow.save();
    if (bookToBorrow.copies === 0) {
        await book_model_1.Book.myStaticMethod(book, false);
    }
    try {
        const newBorrow = await borrow_model_1.Borrow.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: newBorrow,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to borrow book",
            error,
        });
    }
};
exports.borrowBook = borrowBook;
const borrowBooks = async (req, res) => {
    try {
        const books = await borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book",
                },
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: 1,
                        isbn: 1,
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch borrowed books summary",
            error: error,
        });
    }
};
exports.borrowBooks = borrowBooks;
