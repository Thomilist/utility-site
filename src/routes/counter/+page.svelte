<script lang="ts">
    import CounterList from "../../lib/counter/CounterList.svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    const title = "Counter";
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<p>
    A counter intended to be used as an overlay on live streams.
</p>

<p>
    <a href="/counter/create">
        Create New
    </a>
</p>

<CounterList counters={data.counters}/>