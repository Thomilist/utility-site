import type { DeathCounter } from "@prisma/client";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/prisma";

export const load: PageServerLoad = async () =>
{
    const death_counters: DeathCounter[] = await prisma.deathCounter.findMany({
        orderBy: {
            id: "desc"
        }
    });

    return {death_counters};
};