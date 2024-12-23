// import { Request, Response } from 'express';
// import { z } from 'zod';
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// import {
//     findUserByEmail,
//     createUser,
//     findUserById,
//     updateUser,
//     deleteUser,
// } from '../models/userModel';

// const JWT_SECRET = process.env.JWT_SECRET;

// const signupSchema = z.object({
//     name: z.string(),
//     email: z.string().email(),
//     password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
// });

// const loginSchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
// });

// // Signup
// export const signup = async (req: Request, res: Response) => {
//     try {
//         const { success } = signupSchema.safeParse(req.body);
//         if (!success) return res.status(400).json({ message: 'Invalid inputs' });

//         const { name, email, password } = req.body;

//         const existingUser = await findUserByEmail(email);
//         if (existingUser) return res.status(400).json({ message: 'User already exists' });

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await createUser({ name, email, password: hashedPassword });

//         const token = jwt.sign({ userId: user.id }, JWT_SECRET);

//         return res.status(200).json({ message: 'User created successfully', token });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Login
// export const login = async (req: Request, res: Response) => {
//     try {
//         const { success } = loginSchema.safeParse(req.body);
//         if (!success) return res.status(400).json({ message: 'Invalid inputs' });

//         const { email, password } = req.body;

//         const user = await findUserByEmail(email);
//         if (!user) return res.status(400).json({ message: 'User not found' });

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

//         const token = jwt.sign({ userId: user.id }, JWT_SECRET);

//         return res.status(200).json({ message: 'Login successful', token });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Get Profile
// export const getProfile = async (req: any, res: Response) => {
//     try {
//         const userId = req.user.userId;
//         const user = await findUserById(userId);

//         if (!user) return res.status(404).json({ message: 'User not found' });

//         return res.status(200).json({ user });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Update Profile
// export const updateProfile = async (req: any, res: Response) => {
//     try {
//         const userId = req.user.userId;
//         const { name, email, password } = req.body;

//         const dataToUpdate: any = {};
//         if (name) dataToUpdate.name = name;
//         if (email) dataToUpdate.email = email;
//         if (password) dataToUpdate.password = await bcrypt.hash(password, 10);

//         const updatedUser = await updateUser(userId, dataToUpdate);

//         return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
//     } catch (error: any) {
//         if (error.code === 'P2002') return res.status(400).json({ message: 'Email already in use' });

//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Delete User
// export const deleteUserProfile = async (req: any, res: Response) => {
//     try {
//         const userId = req.user.userId;

//         await deleteUser(userId);

//         return res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };


import { Request, Response } from 'express';
import { z } from 'zod';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import {
    findUserByEmail,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
} from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET;

const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

// Signup
export const signup = async (req: Request, res: Response) => {
    try {
        const { success } = signupSchema.safeParse(req.body);
        if (!success) return res.status(400).json({ message: 'Invalid inputs' });

        const { name, email, password } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({
            name,
            email,
            password: hashedPassword,
            level: "beginner", // Default level
            role: "user", // Default role
            subscription: "free", // Default subscription
        });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET);

        return res.status(200).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { success } = loginSchema.safeParse(req.body);
        if (!success) return res.status(400).json({ message: 'Invalid inputs' });

        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET);

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get Profile
export const getProfile = async (req: any, res: Response) => {
    try {
        const userId = req.user.userId;
        const user = await findUserById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update Profile
export const updateProfile = async (req: any, res: Response) => {
    try {
        const userId = req.user.userId;
        const { name, email, password, level, role, subscription } = req.body;

        const dataToUpdate: any = {};
        if (name) dataToUpdate.name = name;
        if (email) dataToUpdate.email = email;
        if (password) dataToUpdate.password = await bcrypt.hash(password, 10);
        if (level) dataToUpdate.level = level;
        if (role) dataToUpdate.role = role;
        if (subscription) dataToUpdate.subscription = subscription;

        const updatedUser = await updateUser(userId, dataToUpdate);

        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error: any) {
        if (error.code === 'P2002') return res.status(400).json({ message: 'Email already in use' });

        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete User
export const deleteUserProfile = async (req: any, res: Response) => {
    try {
        const userId = req.user.userId;

        await deleteUser(userId);

        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
