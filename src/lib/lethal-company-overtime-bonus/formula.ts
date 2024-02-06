// https://lethal.miraheze.org/wiki/Quota

// days_remaining: Number of days until deadline (usually 0 to 3)
// adjust_days: If true, treat 0 days remaining as -1 in line with a bug
// scrap_sold: Value of the scrap sold within the current profit quota
// quota: The current profit quota
// target_balance: The balance desired at the start of the next quota
// current_balance: The balance before wrapping up the quota

// Returns the number of days remaining with the adjustment applied if specified
function adjustedDaysUntilDeadline
(
    args:
    {
        days_remaining: number,
        adjust_days?: boolean
    }
): number
{
    if (args.adjust_days && args.days_remaining === 0)
    {
        return -1;
    }

    return args.days_remaining;
}

// Returns the overtime bonus (rounded down, at least 0)
export function calculateOvertimeBonus
(
    args:
    {
        scrap_sold: number,
        quota: number,
        days_remaining: number,
        adjust_days?: boolean
    }
): number
{
    const bonus
        = (args.scrap_sold - args.quota) / 5
        + 15 * adjustedDaysUntilDeadline({ days_remaining: args.days_remaining, adjust_days: args.adjust_days });
    
    return bonus < 0 ? 0 : Math.floor(bonus);
}

// Returns the value of sold scrap required to achieve a certain balance at the start of the next quota
export function calculateSellingRequiredForTarget
(
    args:
    {
        target_balance: number,
        current_balance?: number,
        quota: number,
        days_remaining: number,
        adjust_days?: boolean
    }
): number
{
    let scrap_to_sell
        = (
            args.target_balance
            + args.quota / 5
            - 15 * adjustedDaysUntilDeadline({ days_remaining: args.days_remaining, adjust_days: args.adjust_days })
            - (args.current_balance ?? 0)
        )
        * 5 / 6;
    
    if (!(calculateOvertimeBonus({ scrap_sold: scrap_to_sell, quota: args.quota, days_remaining: args.days_remaining, adjust_days: args.adjust_days }) > 0))
    {
        scrap_to_sell = args.target_balance - (args.current_balance ?? 0);
    }

    return Math.ceil(scrap_to_sell);
}
