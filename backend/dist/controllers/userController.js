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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserProfile = exports.updateProfile = exports.getProfile = exports.login = exports.signup = void 0;
const zod_1 = require("zod");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel_1 = require("../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET;
const signupSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});
// Signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = signupSchema.safeParse(req.body);
        if (!success)
            return res.status(400).json({ message: 'Invalid inputs' });
        const { name, email, password } = req.body;
        const existingUser = yield (0, userModel_1.findUserByEmail)(email);
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = yield (0, userModel_1.createUser)({ name, email, password: hashedPassword });
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        return res.status(200).json({ message: 'User created successfully', token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.signup = signup;
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = loginSchema.safeParse(req.body);
        if (!success)
            return res.status(400).json({ message: 'Invalid inputs' });
        const { email, password } = req.body;
        const user = yield (0, userModel_1.findUserByEmail)(email);
        if (!user)
            return res.status(400).json({ message: 'User not found' });
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        return res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.login = login;
// Get Profile
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const user = yield (0, userModel_1.findUserById)(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getProfile = getProfile;
// Update Profile
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const { name, email, password } = req.body;
        const dataToUpdate = {};
        if (name)
            dataToUpdate.name = name;
        if (email)
            dataToUpdate.email = email;
        if (password)
            dataToUpdate.password = yield bcrypt.hash(password, 10);
        const updatedUser = yield (0, userModel_1.updateUser)(userId, dataToUpdate);
        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    }
    catch (error) {
        if (error.code === 'P2002')
            return res.status(400).json({ message: 'Email already in use' });
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateProfile = updateProfile;
// Delete User
const deleteUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        yield (0, userModel_1.deleteUser)(userId);
        return res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteUserProfile = deleteUserProfile;
