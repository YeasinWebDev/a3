import { Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "./book.model";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    if (error instanceof mongoose.Error.ValidationError) {
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

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    let genre = req.query.filter;
    let sortBy = req.query.sortBy || "createdAt";
    let sort = req.query.sort || "asc";
    let limit = 10;

    if (req.query.limit) {
      const parsedLimit = parseInt(req.query.limit as string);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        limit = parsedLimit;
      }
    }
    const filter: Record<string, any> = {};
    if (genre) {
      filter.genre = genre;
    }

    const books = await Book.find(filter)
      .sort({ [sortBy]: sort })
      .limit(limit);
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: error,
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  console.log(req.params.bookId);
  try {
    const book = await Book.findById(req.params.bookId);
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch book",
      error: error,
    });
  }
};

export const updateBookById = async (req: Request, res: Response) => {

  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error,
    });
  }
};

export const deleteBookById = async (req: Request, res: Response) => {

  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error,
    });
  }
};
