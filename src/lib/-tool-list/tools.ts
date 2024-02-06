import type { Tool } from "../types";

export const tools: Tool[] =
[
    {
        name: "Counter",
        description: "A counter for stream overlays",
        route: "/counter"
    },
    {
        name: "Lethal Company Overtime Bonus Calculator",
        description: "Calculate how much to sell to reach a certain balance once the overtime bonus is applied.",
        route: "/lethal-company-overtime-bonus"
    }
];
