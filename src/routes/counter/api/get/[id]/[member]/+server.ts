import { findMemberFromParams } from "$lib/counter/find";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) =>
{
    const member = await findMemberFromParams(params);
    return json(member, {status: 200});
};