<script lang="ts">
    const title = "Create New Counter";

    let member_index = 0;
    let members: {id: number, name: string}[] = [];

    function addMember()
    {
        members = [...members, {id: member_index++, name: ""}];
        return;
    }

    function removeMember(id: number)
    {
        members = members.filter(member => member.id !== id);
        return;
    }

    addMember();
</script>

<style>
    @import "$lib/counter/form.css";
    @import "style.css";
</style>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<form method="post" action="?/create">
    <fieldset class="counter">
        <legend>
            Counter
        </legend>

        <div class="fields">
            <label for="name">Name:</label>
            <input id="name" name="name" type="text" required>

            <label for="password">Password:</label>
            <input id="password" name="password" type="password" required>

            <label for="sum_label">Sum label:</label>
            <input id="sum_label" name="sum_label" type="text">
        </div>

        <p>
            The password is stored in plain text. Treat it the same as e.g. a password for a temporary game lobby, and definitely do not reuse a password from anything important.
        </p>

        <p>
            Leave sum label blank to not show sum of counts.
        </p>
    </fieldset>

    <fieldset class="members">
        <legend>
            Members
        </legend>

        <div class="fields">
            {#each members as member (member.id)}
                <input id="member[{member.id}]" name="member" type="text" required>
                <button type="button" on:click={() => {removeMember(member.id)}}>
                    Remove
                </button>
            {/each}
        </div>

        <button type="button" on:click={addMember}>
            Add another member
        </button>
    </fieldset>

    <button>Create</button>
</form>