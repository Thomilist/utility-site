import { EventEmitter } from "node:events";
import type { CounterWithMembers } from "$lib/prisma";
import { COUNTER_EVENT } from "./named";
import { findCounterWithMembers } from "./find";

export const events: EventEmitter[] = [];

export async function pushCounterUpdateFromDatabase(counter_id: number)
{
    let updated_counter = await findCounterWithMembers(counter_id);
    updated_counter.password = "";
    pushCounterUpdate(updated_counter);
}

export function pushCounterUpdate(data: CounterWithMembers)
{
    for (const event of events)
    {
        event.emit(COUNTER_EVENT.update, data);
    }
}