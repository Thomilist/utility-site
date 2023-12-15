import { authenticateDeathCounter } from "$lib/death-counter/authenticate";
import { findDeathCounter, findDeathCounterWithMembers } from "$lib/death-counter/find";
import { formString, numericParam } from "$lib/helpers";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/prisma";
import { pushDeathCounterUpdateFromDatabase } from "$lib/death-counter/events";

export const load: PageServerLoad = async ({ params }) =>
{
    const death_counter_id = numericParam(params.id);
    const death_counter = await findDeathCounterWithMembers(death_counter_id);

    return {death_counter: death_counter};
};

export const actions =
{
    update: async ({ request }) =>
    {
        const data = await request.formData();
        const death_counter_id = numericParam(formString(data.get("death_counter_id")));
        const death_counter = await findDeathCounter(death_counter_id);
        const current_password = formString(data.get("current_password"));

        if (!authenticateDeathCounter(death_counter, current_password))
        {
            return fail(401, {message: "Invalid password."});
        }

        const new_death_counter_data =
        {
            name: formString(data.get("name")),
            password: formString(data.get("new_password")) || current_password,
            sumLabel: formString(data.get("sum_label"))
        }

        await prisma.deathCounter.update({
            where: {
                id: death_counter_id
            },
            data: new_death_counter_data
        });

        const member_names = data.getAll("member_name");
        const member_deaths = data.getAll("member_deaths");

        const members = member_names.map((name, i) =>
        {
            const deaths = numericParam(formString(member_deaths[i]))
            return {name: `${name}`, deathCounterId: death_counter_id, deaths: deaths};
        });

        await prisma.member.deleteMany({
            where: {
                deathCounterId: death_counter_id
            }
        });

        await prisma.member.createMany({
            data: [...members]
        });
        
        pushDeathCounterUpdateFromDatabase(death_counter_id);
        redirect(303, "/death-counter");
    }
}