import { EventEmitter } from "node:events";
import type { DeathCounterWithMembers } from "$lib/prisma";
import { DEATH_COUNTER_EVENT } from "./named";



export const events: EventEmitter[] = [];

export function pushDeathCounterUpdate(data: DeathCounterWithMembers)
{
    for (const event of events)
    {
        event.emit(DEATH_COUNTER_EVENT.update, data);
    }
}