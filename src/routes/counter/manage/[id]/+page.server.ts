import { authenticateCounter } from "$lib/counter/authenticate";
import { findCounter, findCounterWithMembers } from "$lib/counter/find";
import { formString, numericParam } from "$lib/helpers";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/prisma";
import { pushCounterUpdateFromDatabase } from "$lib/counter/events";
import type { Member } from "@prisma/client";

export const load: PageServerLoad = async ({ params }) =>
{
    const counter_id = numericParam(params.id);
    let counter = await findCounterWithMembers(counter_id);
    
    counter.members.sort((a: Member, b: Member) =>
    {
        return a.sortIndex - b.sortIndex
    });

    return {counter: counter};
};

export const actions =
{
    update: async ({ request }) =>
    {
        const data = await request.formData();
        const counter_id = numericParam(formString(data.get("counter_id")));
        const counter = await findCounter(counter_id);
        const current_password = formString(data.get("current_password"));

        if (!authenticateCounter(counter, current_password))
        {
            return fail(401, {message: "Invalid password."});
        }

        const new_counter_data =
        {
            name: formString(data.get("name")),
            password: formString(data.get("new_password")) || current_password,
            sumLabel: formString(data.get("sum_label"))
        }

        await prisma.counter.update({
            where: {
                id: counter_id
            },
            data: new_counter_data
        });

        const member_names = data.getAll("member_name");
        const member_count = data.getAll("member_count");

        const members = member_names.map((name, i) =>
        {
            const count = numericParam(formString(member_count[i]))
            return {name: `${name}`, counterId: counter_id, count: count, sortIndex: i};
        });

        await prisma.member.deleteMany({
            where: {
                counterId: counter_id
            }
        });

        await prisma.member.createMany({
            data: [...members]
        });
        
        pushCounterUpdateFromDatabase(counter_id);
        redirect(303, "/counter");
    }
}