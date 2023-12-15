<script lang="ts">
    import type { ActionData, PageData } from "./$types";

    export let data: PageData;
    export let form: ActionData;

    const title = "Manage Death Counter";

    let member_index = 0;
    let members = data.death_counter.members.map((member) =>
    {
        return {id: member_index++, name: member.name, deaths: member.deaths};
    });

    function addMember()
    {
        members = [...members, {id: member_index++, name: "", deaths: 0}];
        return;
    }

    function removeMember(id: number)
    {
        members = members.filter(member => member.id !== id);
        return;
    }
</script>

<style>
    @import "$lib/form.css";
    @import "style.css";
</style>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<form method="post" action="?/update">
    <fieldset class="authenticate">
        <legend>
            Authenticate
        </legend>

        <div class="fields">
            <label for="current_password">Current password:</label>
            <input id="current_password" name="current_password" type="password" required>
        </div>

        {#if form}
            <p class="invalid_password">
                Error: {form.message}
            </p>
        {/if}
    </fieldset>

    <fieldset class="change_password">
        <legend>
            Change Password
        </legend>

        <div class="fields">
            <label for="new_password">New password:</label>
            <input id="new_password" name="new_password" type="password">
        </div>

        <p>
            Leave new password blank to keep the current password.
        </p>
    </fieldset>

    <fieldset class="counter">
        <legend>
            Death Counter
        </legend>

        <div class="fields">
            <label for="death_counter_id">ID:</label>
            <input id="death_counter_id" name="death_counter_id" type="number" value={data.death_counter.id} readonly>

            <label for="name">Name:</label>
            <input id="name" name="name" type="text" value={data.death_counter.name} required>

            <label for="sum_label">Sum label:</label>
            <input id="sum_label" name="sum_label" type="text" value={data.death_counter.sumLabel} required>
        </div>

        <p>
            Leave sum label blank to not show summed deaths.
        </p>
    </fieldset>

    <fieldset class="members">
        <legend>
            Members
        </legend>

        <div class="fields">
            {#each members as member, i}
                <input id="member_name[${i}]" name="member_name" type="text" value={member.name} required>
                <input id="member_deaths[${i}]" name="member_deaths" type="number" value={member.deaths} min="0" required>
                <button type="button" on:click={() => {removeMember(member.id)}}>
                    Remove
                </button>
            {/each}
        </div>

        <button type="button" on:click={addMember}>
            Add another member
        </button>
    </fieldset>

    <button>Save</button>
</form>