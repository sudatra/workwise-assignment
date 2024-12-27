import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = (username: string, passwordHash: string): Promise<User> => {
    return prisma.user.create({
        data: { username: username, passwordHash: passwordHash }
    });
}

export const findUser = (username: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { username: username }
    });
}