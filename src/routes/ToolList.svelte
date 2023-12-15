<script lang="ts">
    import { tools } from "$lib/tools";


</script>

<table>
    <tr>
        <th>
            Tool
        </th>
        <th>
            Description
        </th>
    </tr>
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
</table>