import { formString } from '$lib/helpers.js';
import { prisma } from '$lib/prisma.js';
import { redirect } from '@sveltejs/kit';

export const actions =
{
    create: async ({ request }) =>
    {
        const data = await request.formData();

        if (!data.has("name") || !data.has("password"))
        {
            redirect(303, "/death-counter/create");
        }

        const death_counter = await prisma.deathCounter.create({
            data: {
                name: formString(data.get("name")),
                password: formString(data.get("password")),
                sumLabel: formString(data.get("sum_label"))
            }
        });

        const members = data.getAll("member").map((member, i) =>
        {
            return {name: `${member}`, deathCounterId: death_counter.id, sortIndex: i};
        });

        await prisma.member.createMany({
            data: [...members]
        })
        
        redirect(303, "/death-counter");
    }
};