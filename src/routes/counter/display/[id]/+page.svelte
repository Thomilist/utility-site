<script lang="ts">
    import type { Member } from "@prisma/client";
    import type { PageData } from "./$types";
    import { onMount } from "svelte";
    import { COUNTER_EVENT } from "$lib/counter/named";

    export let data: PageData;

    let counter = data.counter;

    $: show_sum = counter.sumLabel ? true : false;

    function reducer(accumulator: number, current_value: Member): number
    {
        return accumulator + current_value.count;
    }

    onMount(() =>
    {
        const sse = new EventSource(`/counter/display/${data.counter.id}`);

        sse.addEventListener(COUNTER_EVENT.update, (event) =>
        {
            let received_data = JSON.parse(event.data);

            if (received_data.id === counter.id)
            {
                received_data.members.sort((a: Member, b: Member) =>
                {
                    return a.sortIndex - b.sortIndex
                });

                counter = received_data;
            }
        });

        return () => sse.close();
    });
</script>

<style>
    @import "style.css";
</style>

<svelte:head>
    <title>{counter.name}</title>
</svelte:head>

<table>
    {#each counter.members as member}
        <tr>
            <td class="member_name">
                {member.name}:
            </td>
            <td class="member_count">
                {member.count}
            </td>
        </tr>
    {/each}

    {#if show_sum}
        <tr>
            <td class="sum_label">
                {counter.sumLabel}:
            </td>
            <td class="sum">
                {counter.members.reduce(reducer, 0)}
            </td>
        </tr>
    {/if}
</table>