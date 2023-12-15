import { EventEmitter } from "node:events";
import type { DeathCounterWithMembers } from "$lib/prisma";
import { DEATH_COUNTER_EVENT } from "./named";
import { findDeathCounterWithMembers } from "./find";

export const events: EventEmitter[] = [];

export async function pushDeathCounterUpdateFromDatabase(death_counter_id: number)
{
    let updated_death_counter = await findDeathCounterWithMembers(death_counter_id);
    updated_death_counter.password = "";
    pushDeathCounterUpdate(updated_death_counter);
}

export function pushDeathCounterUpdate(data: DeathCounterWithMembers)
{
    for (const event of events)
    {
        event.emit(DEATH_COUNTER_EVENT.update, data);
    }
}