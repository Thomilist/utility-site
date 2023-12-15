<script lang="ts">
    import type { Member } from "@prisma/client";
    import type { PageData } from "./$types";

    export let data: PageData;

    const show_sum = data.death_counter.sumLabel ? true : false;

    function reducer(accumulator: number, current_value: Member): number
    {
        return accumulator + current_value.deaths;
    }

</script>

<style>
    @import "style.css";
</style>

<svelte:head>
    <title>{data.death_counter.name}</title>
</svelte:head>

<table>
    {#each data.death_counter.members as member}
        <tr>
            <td>
                {member.name}:
            </td>
            <td>
                {member.deaths}
            </td>
        </tr>
    {/each}

    {#if show_sum}
        <tr>
            <td>
                {data.death_counter.sumLabel}:
            </td>
            <td>
                {data.death_counter.members.reduce(reducer, 0)}
            </td>
        </tr>
    {/if}
</table>