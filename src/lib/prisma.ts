import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export type DeathCounterWithMembers = Prisma.DeathCounterGetPayload<{
    include: {
        members: true
    }
}>;