<script lang="ts">
    import { calculateSellingRequiredForTarget } from "./formula";
    import { initial_quota, initial_balance, moons, type Moon } from "./presets";

    const null_moon: Moon = { label: "Custom", cost: 0 };
    const all_moons: Moon[] = [null_moon, ...moons];
    const costliest_moon = costliestMoon(moons);

    let target_preset_index: number = all_moons.indexOf(costliest_moon);
    let target_balance: number = costliest_moon.cost;
    let current_balance: number = initial_balance;
    let quota: number = initial_quota;
    let days_remaining: number = 0;
    let adjust_days: boolean = true;

    $: scrap_to_sell = calculateSellingRequiredForTarget
    ({
        target_balance: target_balance,
        current_balance: current_balance,
        quota: quota,
        days_remaining: days_remaining,
        adjust_days: adjust_days
    });

    $: if (target_preset_index > 0)
    {
        target_balance = (all_moons.at(target_preset_index)?.cost ?? 0);
    }

    function costliestMoon(moons: Moon[]): Moon
    {
        let costliest_moon: Moon = { label: "Null", cost: 0 };

        moons.forEach(moon =>
        {
            if (moon.cost > costliest_moon.cost)
            {
                costliest_moon = moon;
            }
        });

        return costliest_moon;
    }
</script>

<style>
    @import "form.css";
</style>

<form>
    <fieldset>
        <legend>Scrap to sell for target</legend>

        <div class="label-preset-value">
            <label for="target:target.preset target:target.value">Target balance:</label>
            <select id="target:target.preset" bind:value={target_preset_index}>
                {#each all_moons as moon, index}
                    <option value={index}>
                        {moon.label}
                    </option>
                {/each}
            </select>
            <input id="target:target.value" type="number" min=0 bind:value={target_balance} on:change={() => { target_preset_index = 0; }}>
        </div>

        <div class="label-value">
            <label for="target:current">Current balance:</label>
            <input id="target:current" type="number" min=0 bind:value={current_balance}>
        </div>

        <div class="label-value">
            <label for="target:quota">Quota:</label>
            <input id="target:quota" type="number" min=0 bind:value={quota}>
        </div>

        <div class="label-value">
            <label for="target:days_remaining">Days remaining:</label>
            <input id="target:days_remaining" type="number" min=0 bind:value={days_remaining}>
        </div>

        <div class="label-value">
            <label for="target:adjust_days">Deadline bug (-15 on final day):</label>
            <input id="target:adjust_days" type="checkbox" bind:checked={adjust_days}>
        </div>

        <hr>

        <div class="label-value">
            <label for="target:result">Scrap to sell:</label>
            <output id="target:result">{scrap_to_sell}</output>
        </div>
    </fieldset>
</form>
