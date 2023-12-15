import type { DeathCounter } from "@prisma/client";
import { DEATH_COUNTER_HEADERS } from "./headers";
import { error } from "@sveltejs/kit";

export function authenticateDeathCounterRequest(death_counter: DeathCounter, request: Request): boolean
{
    const supplied_password = request.headers.get(DEATH_COUNTER_HEADERS.password);

    if (!supplied_password)
    {
        throw error(400);
    }

    return authenticateDeathCounter(death_counter, supplied_password);
}

export function authenticateDeathCounter(death_counter: DeathCounter, password: string | null): boolean
{
    if (!password)
    {
        return false;
    }
    
    return death_counter.password === password;
}