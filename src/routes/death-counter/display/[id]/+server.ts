import { events } from "$lib/death-counter/events";
import { DEATH_COUNTER_EVENT } from "$lib/death-counter/named";
import type { RequestHandler } from "@sveltejs/kit";
import EventEmitter from "node:events";

export const GET: RequestHandler = () =>
{
    const event = new EventEmitter();
    events.push(event);
    let timer: ReturnType<typeof setInterval> | undefined;
    
    const stream = new ReadableStream
    ({
        start(controller)
        {
            event.on(DEATH_COUNTER_EVENT.update, (data) =>
            {
                controller.enqueue(`event: ${DEATH_COUNTER_EVENT.update}\ndata: ${JSON.stringify(data)}\n\n`);
            });

            timer = setInterval(() =>
            {
                controller.enqueue("event: ping\ndata: ping");
            },
            60000);
        },
        cancel()
        {
            const index = events.indexOf(event);

            if (~index)
            {
                events.splice(index, 1);
            }

            clearInterval(timer);
        }
    });

    return new Response
    (
        stream, 
        {
            headers:
            {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
            }
        }
    )
}