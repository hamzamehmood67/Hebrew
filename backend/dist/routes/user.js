"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Ensure proper imports
const bcrypt = require('bcrypt');
const z = require('zod');
const authenticate = require('../middleware/auth');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const client_1 = require("@prisma/client");
console.log(typeof authenticate);
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = signupSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Please enter valid inputs",
            });
        }
        const { name, email, password } = req.body;
        const existingUser = yield prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const createdUser = yield prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        const token = jwt.sign({ userId: createdUser.id }, JWT_SECRET);
        return res.status(201).json({
            message: "User created successfully",
            token,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = loginSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Please enter valid inputs",
            });
        }
        const { email, password } = req.body;
        const existingUser = yield prisma.user.findUnique({
            where: { email },
        });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = yield bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET);
        return res.status(200).json({
            message: "Login successful",
            token,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
router.get('/profile', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const user = yield prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                // createdAt: true,
                // updatedAt: true,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// PUT /profile - Update user details
router.put('/profile', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const { name, email, password } = req.body;
        const dataToUpdate = {};
        if (name)
            dataToUpdate.name = name;
        if (email)
            dataToUpdate.email = email;
        if (password) {
            dataToUpdate.password = yield bcrypt.hash(password, 10);
        }
        const updatedUser = yield prisma.user.update({
            where: { id: userId },
            data: dataToUpdate,
        });
        return res.status(200).json({
            message: "User updated successfully",
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                //updatedAt: updatedUser.updatedAt,
            },
        });
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "Email already in use" });
        }
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
router.delete('/delete', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }
        yield prisma.user.delete({
            where: { id: userId },
        });
        res.json({ message: 'User deleted successfully.' });
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
}));
exports.default = router;
