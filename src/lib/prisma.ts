import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export type CounterWithMembers = Prisma.CounterGetPayload<{
    include: {
        members: true
    }
}>;