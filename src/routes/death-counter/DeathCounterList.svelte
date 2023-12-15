<script lang="ts">
    import type { DeathCounter } from "@prisma/client";

    export let death_counters: DeathCounter[];
</script>

{#if death_counters.length > 0}
    <table>
        <tr>
            <th>
                ID
            </th>
            <th>
                Name
            </th>
        </tr>

        {#each death_counters as death_counter}
            <tr>
                <td>
                    {death_counter.id}
                </td>
                <td>
                    {death_counter.name}
                </td>
                <td>
                    <a href="/death-counter/display/{death_counter.id}">
                        Display
                    </a>
                </td>
                <td>
                    <a href="/death-counter/operate/{death_counter.id}">
                        Operate
                    </a>
                </td>
                <td>
                    <a href="/death-counter/manage/{death_counter.id}">
                        Manage
                    </a>
                </td>
            </tr>
        {/each}
    </table>
{:else}
    <p>
        No death counters found.
    </p>
{/if}