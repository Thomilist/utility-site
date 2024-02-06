import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { numericParam } from "$lib/helpers";
import type { Member } from "@prisma/client";

export const load: PageServerLoad = async ({ params }) =>
{
    const counter_id = numericParam(params.id);
    
    let counter = await prisma.counter.findUnique({
        where: {
            id: counter_id
        },
        include: {
            members: true
        }
    });

    if (!counter)
    {
        error(404);
    }

    counter.password = "";
    counter.members.sort((a: Member, b: Member) =>
    {
        return a.sortIndex - b.sortIndex
    });

    return { counter: counter };
};