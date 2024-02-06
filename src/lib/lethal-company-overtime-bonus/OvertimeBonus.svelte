<script lang="ts">
    import { calculateOvertimeBonus } from "./formula";
    import { initial_quota } from "./presets";

    let scrap_sold: number = 0;
    let quota: number = initial_quota;
    let days_remaining: number = 0;
    let adjust_days: boolean = true;

    $: overtime_bonus = calculateOvertimeBonus
    ({
        scrap_sold: scrap_sold,
        quota: quota,
        days_remaining: days_remaining,
        adjust_days: adjust_days
    });
</script>

<style>
    @import "form.css";
</style>

<form>
    <fieldset>
        <legend>Overtime bonus</legend>

        <div class="label-value">
            <label for="bonus:scrap_sold">Scrap sold:</label>
            <input id="bonus:scrap_sold" type="number" min=0 bind:value={scrap_sold}>
        </div>

        <div class="label-value">
            <label for="bonus:quota">Quota:</label>
            <input id="bonus:quota" type="number" min=0 bind:value={quota}>
        </div>

        <div class="label-value">
            <label for="bonus:days_remaining">Days remaining:</label>
            <input id="bonus:days_remaining" type="number" min=0 bind:value={days_remaining}>
        </div>

        <div class="label-value">
            <label for="bonus:adjust_days">Deadline bug (-15 on final day):</label>
            <input id="bonus:adjust_days" type="checkbox" bind:checked={adjust_days}>
        </div>

        <hr>

        <div class="label-value">
            <label for="bonus:result">Overtime bonus:</label>
            <output id="bonus:result">{overtime_bonus}</output>
        </div>
    </fieldset>
</form>
