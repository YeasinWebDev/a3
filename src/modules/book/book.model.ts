import mongoose, { Schema, Document, Model } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook, UpdateAvailability>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v; 
        return ret;
      },
    },
  }
);

interface UpdateAvailability extends Model<IBook> {
  myStaticMethod: (bookId: string, available: boolean) => Promise<void>;
}

bookSchema.statics.myStaticMethod = async function (
  bookId: string,
  available: boolean
) {
  await this.updateOne({ _id: bookId }, { available });
};

export const Book = mongoose.model<IBook, UpdateAvailability>(
  "Book",
  bookSchema
);
