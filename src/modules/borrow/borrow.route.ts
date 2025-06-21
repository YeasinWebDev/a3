import { Router } from "express";
import { borrowBook, borrowBooks } from "./borrow.controllers";

export const borrowRoute = Router()

borrowRoute.post("/", borrowBook)
borrowRoute.get("/", borrowBooks)