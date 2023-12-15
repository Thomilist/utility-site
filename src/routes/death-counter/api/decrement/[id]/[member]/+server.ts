import { authenticateDeathCounterRequest } from "$lib/death-counter/authenticate";
import { findDeathCounter, findMember } from "$lib/death-counter/find";
import { numericParam } from "$lib/helpers";
import { prisma } from "$lib/prisma";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ params, request }) =>
{
    const death_counter_id = numericParam(params.id);
    const death_counter = await findDeathCounter(death_counter_id);
    
    if (!authenticateDeathCounterRequest(death_counter, request))
    {
        throw error(401);
    }

    const member_name = params.member;

    if (!member_name)
    {
        throw error(400);
    }
    
    const member = await findMember(death_counter_id, member_name);

    const updated_member = await prisma.member.update({
        where: {
            deathCounterId_name: {
                deathCounterId: member.deathCounterId,
                name: member.name
            }
        },
        data: {
            deaths: {
                decrement: 1
            }
        }
    });

    return json(updated_member, {status: 200});
}