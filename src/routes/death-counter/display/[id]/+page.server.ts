import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { numericParam } from "$lib/helpers";

export const load: PageServerLoad = async ({ params }) =>
{
    const death_counter_id = numericParam(params.id);
    
    const death_counter = await prisma.deathCounter.findUnique({
        where: {
            id: death_counter_id
        },
        include: {
            members: true
        }
    });

    if (!death_counter)
    {
        throw error(404);
    }

    return { death_counter: death_counter };
};