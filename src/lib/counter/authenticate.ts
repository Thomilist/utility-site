import type { Counter } from "@prisma/client";
import { COUNTER_HEADERS } from "./named";
import { error } from "@sveltejs/kit";

export function authenticateCounterRequest(counter: Counter, request: Request): boolean
{
    const supplied_password = request.headers.get(COUNTER_HEADERS.password);

    if (!supplied_password)
    {
        error(400);
    }

    return authenticateCounter(counter, supplied_password);
}

export function authenticateCounter(counter: Counter, password: string | null): boolean
{
    if (!password)
    {
        return false;
    }
    
    return counter.password === password;
}