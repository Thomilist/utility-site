<script lang="ts">
    import DeathCounterList from "./DeathCounterList.svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    const title = "Death Counter";
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<p>
    A death counter intended to be used as an overlay on live streams of video game challenge runs.
</p>

<a href="/death-counter/create">
    Create New
</a>

<DeathCounterList death_counters={data.death_counters}/>