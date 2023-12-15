import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = () =>
{
    const stream = new ReadableStream
    ({
        start(controller)
        {

        },
        cancel()
        {

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