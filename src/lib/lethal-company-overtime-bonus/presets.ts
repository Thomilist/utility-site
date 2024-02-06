// https://lethal-company.fandom.com/wiki/Moons#Moons_Catalogue

export type Moon =
{
    label: string,
    cost: number
};

export const moons: Moon[] =
[
    { label: "85-Rend", cost: 550 },
    { label: "7-Dine", cost: 600 },
    { label: "8-Titan", cost: 700 }
];

export const initial_quota = 130;

export const initial_balance = 60;