import { Request, Response } from "express";
import { Book } from "../book/book.model";
import { Borrow } from "./borrow.model";

export const borrowBook = async (req: Request, res: Response) => {
  const { book, quantity } = req.body;

  const bookToBorrow = await Book.findById(book);

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
    await Book.myStaticMethod(book, false);
  }

  try {
    const newBorrow = await Borrow.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: newBorrow,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to borrow book",
      error,
    });
  }
};

export const borrowBooks = async (req: Request, res: Response) => {
  try {
    const books = await Borrow.aggregate([
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch borrowed books summary",
      error: error,
    });
  }
};
