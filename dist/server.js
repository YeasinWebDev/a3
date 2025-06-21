"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const book_route_1 = require("./modules/book/book.route");
const borrow_route_1 = require("./modules/borrow/borrow.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(process.env.PORT, () => console.log("Server is running on port 3000"));
app.get("/", (req, res) => {
    res.status(200).send("pong");
});
app.use("/api/books", book_route_1.bookRoute);
app.use("/api/borrow", borrow_route_1.borrowRoute);
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
async function server() {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL || "");
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log(error, "Failed to connect to MongoDB");
    }
}
server();
