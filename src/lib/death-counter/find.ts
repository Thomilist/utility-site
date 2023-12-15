import { numericParam } from "$lib/helpers";
import { prisma } from "$lib/prisma";
import { error } from "@sveltejs/kit";

export async function findDeathCounterWithMembers(death_counter_id: number)
{
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
        error(404);
    }

    return death_counter;
}

export async function findDeathCounter(death_counter_id: number)
{
    const death_counter = await prisma.deathCounter.findUnique({
        where: {
            id: death_counter_id
        }
    });

    if (!death_counter)
    {
        error(404);
    }

    return death_counter;
}

export async function findMemberFromParams(params: Partial<Record<string, string>>)
{
    const death_counter_id = numericParam(params.id);
    const member_name = params.member;

    if (!member_name)
    {
        error(404);
    }
    
    return await findMember(death_counter_id, member_name)
}

export async function findMember(death_counter_id: number, member_name: string)
{
    const member = await prisma.member.findUnique({
        where: {
            deathCounterId_name: {
                deathCounterId: death_counter_id,
                name: member_name
            }
        }
    });

    if (!member)
    {
        error(404);
    }

    return member;
}