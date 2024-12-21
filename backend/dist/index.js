"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("./routes/user"));
const cors = require('cors');
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Allow requests from your frontend origin
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Use the user routes
app.use('/api/users', user_1.default);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
