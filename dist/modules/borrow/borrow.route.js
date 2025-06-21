"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoute = void 0;
const express_1 = require("express");
const borrow_controllers_1 = require("./borrow.controllers");
exports.borrowRoute = (0, express_1.Router)();
exports.borrowRoute.post("/", borrow_controllers_1.borrowBook);
exports.borrowRoute.get("/", borrow_controllers_1.borrowBooks);
