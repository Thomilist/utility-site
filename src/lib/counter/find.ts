import { numericParam } from "$lib/helpers";
import { prisma, type CounterWithMembers } from "$lib/prisma";
import type { Counter, Member } from "@prisma/client";
import { error } from "@sveltejs/kit";

export async function findCounterWithMembers(counter_id: number): Promise<CounterWithMembers>
{
    const counter = await prisma.counter.findUnique({
        where: {
            id: counter_id
        },
        include: {
            members: {
                orderBy: {
                    sortIndex: "asc"
                }
            }
        }
    });

    if (!counter)
    {
        error(404);
    }

    return counter;
}

export async function findCounter(counter_id: number): Promise<Counter>
{
    const counter = await prisma.counter.findUnique({
        where: {
            id: counter_id
        }
    });

    if (!counter)
    {
        error(404);
    }

    return counter;
}

export async function findMemberFromParams(params: Partial<Record<string, string>>): Promise<Member>
{
    const counter_id = numericParam(params.id);
    const member_name = params.member;

    if (!member_name)
    {
        error(404);
    }
    
    return await findMember(counter_id, member_name)
}

export async function findMember(counter_id: number, member_name: string): Promise<Member>
{
    const member = await prisma.member.findUnique({
        where: {
            counterId_name: {
                counterId: counter_id,
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