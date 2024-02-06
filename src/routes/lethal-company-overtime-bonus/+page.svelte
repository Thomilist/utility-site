<script lang="ts">
    import OvertimeBonus from "$lib/lethal-company-overtime-bonus/OvertimeBonus.svelte";
    import ScrapToSell from "$lib/lethal-company-overtime-bonus/ScrapToSell.svelte";

    const title = "Lethal Company Overtime Bonus Calculator";
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<style>
    @import "style.css";
</style>

<h1>{title}</h1>

<div class="calculators">
    <OvertimeBonus/>
    <ScrapToSell/>

    <p>
        Note: The calculators are independant.
    </p>
</div>