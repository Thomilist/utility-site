import type { Counter } from "@prisma/client";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/prisma";

export const load: PageServerLoad = async () =>
{
    const counters: Counter[] = await prisma.counter.findMany({
        orderBy: {
            id: "desc"
        }
    });

    return {counters: counters};
};