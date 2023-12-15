import { error } from "@sveltejs/kit";

export function numericParam(param: string | null | undefined): number
{
    if (!param)
    {
        throw error(400);
    }

    const num = Number.parseInt(param);

    if (Number.isNaN(num))
    {
        throw error(400);
    }

    return num;
}

export function formString(form_value: File | string | null): string
{
    return form_value ? `${form_value}` : "";
}