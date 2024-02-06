import { authenticateCounterRequest } from "$lib/counter/authenticate";
import { pushCounterUpdateFromDatabase } from "$lib/counter/events";
import { findCounter, findMember } from "$lib/counter/find";
import { COUNTER_HEADERS } from "$lib/counter/named";
import { numericParam } from "$lib/helpers";
import { prisma } from "$lib/prisma";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const PUT: RequestHandler = async ({ params, request }) =>
{
    const counter_id = numericParam(params.id);
    const counter = await findCounter(counter_id);
    
    if (!authenticateCounterRequest(counter, request))
    {
        error(401);
    }

    const new_value = numericParam(request.headers.get(COUNTER_HEADERS.value));

    const member_name = params.member;

    if (!member_name)
    {
        error(400);
    }
    
    const member = await findMember(counter_id, member_name);

    const updated_member = await prisma.member.update({
        where: {
            counterId_name: {
                counterId: member.counterId,
                name: member.name
            }
        },
        data: {
            count: {
                set: new_value
            }
        }
    });

    await pushCounterUpdateFromDatabase(counter_id);
    return json(updated_member, {status: 200});
}