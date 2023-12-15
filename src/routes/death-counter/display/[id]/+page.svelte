<script lang="ts">
    import type { Member } from "@prisma/client";
    import type { PageData } from "./$types";
    import { onMount } from "svelte";
    import { DEATH_COUNTER_EVENT } from "$lib/death-counter/named";

    export let data: PageData;

    let death_counter = data.death_counter;

    $: show_sum = death_counter.sumLabel ? true : false;

    function reducer(accumulator: number, current_value: Member): number
    {
        return accumulator + current_value.deaths;
    }

    onMount(() =>
    {
        const sse = new EventSource(`/death-counter/display/${data.death_counter.id}`);

        sse.addEventListener(DEATH_COUNTER_EVENT.update, (event) =>
        {
            death_counter = JSON.parse(event.data);
        });

        return () => sse.close();
    });
</script>

<style>
    @import "style.css";
</style>

<svelte:head>
    <title>{death_counter.name}</title>
</svelte:head>

<table>
    {#each death_counter.members as member}
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
                {death_counter.sumLabel}:
            </td>
            <td>
                {death_counter.members.reduce(reducer, 0)}
            </td>
        </tr>
    {/if}
</table>