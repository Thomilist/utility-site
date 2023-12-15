import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { numericParam } from "$lib/helpers";
import type { Member } from "@prisma/client";

export const load: PageServerLoad = async ({ params }) =>
{
    const death_counter_id = numericParam(params.id);
    
    let death_counter = await prisma.deathCounter.findUnique({
        where: {
            id: death_counter_id
        },
        include: {
            members: true
        }
    });

    if (!death_counter)
    {
        error(404);
    }

    death_counter.password = "";
    death_counter.members.sort((a: Member, b: Member) =>
    {
        return a.sortIndex - b.sortIndex
    });

    return { death_counter: death_counter };
};