<script lang="ts">
    import { tools } from "./tools";
</script>

<style>
    @import "table.css";
</style>

<table>
    <thead>
        <tr>
            <th>
                Tool
            </th>
            <th>
                Description
            </th>
        </tr>
    </thead>
    <tbody>
        {#each tools as tool}
            <tr>
                <td>
                    <a href={tool.route}>
                        {tool.name}
                    </a>
                </td>
                <td>
                    {tool.description}
                </td>
            </tr>
        {/each}
    </tbody>
</table>