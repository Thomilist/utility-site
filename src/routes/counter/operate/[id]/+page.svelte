<script lang="ts">
    import type { Member } from "@prisma/client";
    import type { PageData } from "./$types";
    import { onMount } from "svelte";
    import { COUNTER_EVENT } from "$lib/counter/named";

    export let data: PageData;

    let counter = data.counter;
    let password = "";

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

    function decrement(name: string)
    {
        fetch(`/counter/api/decrement/${counter.id}/${name}`, {method: "POST", headers: {"Counter-Password": password}});
    }

    function increment(name: string)
    {
        fetch(`/counter/api/increment/${counter.id}/${name}`, {method: "POST", headers: {"Counter-Password": password}});
    }
</script>

<style>
    @import "style.css";
</style>

<svelte:head>
    <title>{counter.name}</title>
</svelte:head>

<h1>{counter.name}</h1>

<div>
    <label for="password">Password</label>
    <input id="password" type="password" bind:value={password} required>
</div>

<table>
    {#each counter.members as member}
        <tr>
            <td class="name">
                {member.name}:
            </td>
            <td>
                <button on:click={() => decrement(member.name)}>
                    -
                </button>
            </td>
            <td class="count">
                {member.count}
            </td>
            <td>
                <button on:click={() => increment(member.name)}>
                    +
                </button>
            </td>
        </tr>
    {/each}
</table>