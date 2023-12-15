<script lang="ts">
    import type { Member } from "@prisma/client";
    import type { PageData } from "./$types";
    import { onMount } from "svelte";
    import { DEATH_COUNTER_EVENT } from "$lib/death-counter/named";

    export let data: PageData;

    let death_counter = data.death_counter;

    onMount(() =>
    {
        const sse = new EventSource(`/death-counter/display/${data.death_counter.id}`);

        sse.addEventListener(DEATH_COUNTER_EVENT.update, (event) =>
        {
            let received_data = JSON.parse(event.data);

            if (received_data.id === death_counter.id)
            {
                received_data.members.sort((a: Member, b: Member) =>
                {
                    return a.sortIndex - b.sortIndex
                });

                death_counter = received_data;
            }
        });

        return () => sse.close();
    });

    function decrement(name: string)
    {
        const password = "hunter2";
        fetch(`/death-counter/api/decrement/${death_counter.id}/${name}`, {method: "POST", headers: {"Death-Counter-Password": password}});
    }

    function increment(name: string)
    {
        const password = "hunter2";
        fetch(`/death-counter/api/increment/${death_counter.id}/${name}`, {method: "POST", headers: {"Death-Counter-Password": password}});
    }
</script>

<style>
    @import "style.css";
</style>

<svelte:head>
    <title>{death_counter.name}</title>
</svelte:head>

<h1>{death_counter.name}</h1>

<table>
    {#each death_counter.members as member}
        <tr>
            <td class="name">
                {member.name}:
            </td>
            <td>
                <button on:click={() => decrement(member.name)}>
                    -
                </button>
            </td>
            <td class="deaths">
                {member.deaths}
            </td>
            <td>
                <button on:click={() => increment(member.name)}>
                    +
                </button>
            </td>
        </tr>
    {/each}
</table>