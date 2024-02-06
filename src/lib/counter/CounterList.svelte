<script lang="ts">
    import type { Counter } from "@prisma/client";

    export let counters: Counter[];
</script>

{#if counters.length > 0}
    <table>
        <tr>
            <th>
                ID
            </th>
            <th>
                Name
            </th>
        </tr>

        {#each counters as counter}
            <tr>
                <td>
                    {counter.id}
                </td>
                <td>
                    {counter.name}
                </td>
                <td>
                    <a href="/counter/display/{counter.id}">
                        Display
                    </a>
                </td>
                <td>
                    <a href="/counter/operate/{counter.id}">
                        Operate
                    </a>
                </td>
                <td>
                    <a href="/counter/manage/{counter.id}">
                        Manage
                    </a>
                </td>
            </tr>
        {/each}
    </table>
{:else}
    <p>
        No counters found.
    </p>
{/if}