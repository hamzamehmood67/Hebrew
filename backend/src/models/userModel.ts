import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
};

export const createUser = async (data: { name: string; email: string; password: string; level?: string; role?: string; subscription?: string }) => {
    return await prisma.user.create({ data });
};

export const findUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            level: true,
            role: true,
            subscription: true,
            xp: true,
        },
    });
};

export const updateUser = async (id: string, data: { name?: string; email?: string; password?: string; level?: string; role?: string; subscription?: string }) => {
    return await prisma.user.update({
        where: { id },
        data,
    });
};

export const deleteUser = async (id: string) => {
    return await prisma.user.delete({ where: { id } });
};
