import express, { Request, Response } from 'express';  // Ensure proper imports
const bcrypt = require('bcrypt');
const z = require('zod');
const authenticate = require('../middleware/auth');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken')
import { Prisma, PrismaClient, User } from '@prisma/client';

console.log(typeof authenticate);
const prisma = new PrismaClient();
const router = express.Router();

const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});


router.post('/signup', async (req: any, res: any) => {
    try {

        const { success } = signupSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Please enter valid inputs",
            });
        }

        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await prisma.user.create({
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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/login', async (req: any, res: any) => {
    try {
        const { success } = loginSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Please enter valid inputs",
            });
        }
        const { email, password } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET);

        return res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/profile', authenticate, async (req: any, res: any) => {
    try {
        const userId = req.user.userId;

        const user = await prisma.user.findUnique({
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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


// PUT /profile - Update user details
router.put('/profile', authenticate, async (req: any, res: any) => {
    try {
        const userId = req.user.userId;
        const { name, email, password } = req.body;

        const dataToUpdate: any = {};
        if (name) dataToUpdate.name = name;
        if (email) dataToUpdate.email = email;
        if (password) {
            dataToUpdate.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
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
    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "Email already in use" });
        }
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


router.delete('/delete', authenticate, async (req: any, res: any) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        await prisma.user.delete({
            where: { id: userId },
        });

        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
});
export default router;
