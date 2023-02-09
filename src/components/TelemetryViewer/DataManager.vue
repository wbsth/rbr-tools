<script setup>
    import { ref } from "vue";
    import DataManagerRow from "./DataManagerRow.vue";

    const rows = ref([
        {
            id: 0,
            active: false,
            name: "First Data",
            color: "red"
        },
        {
            id: 1,
            active: true,
            name: "Second Data",
            color: "blue"
        },
    ]);

    function deleteRow(row){
        const index = rows.value.findIndex((r) => r.id === row.id);
        if (index === -1) {
            return;
        }
        rows.value.splice(index, 1);
    }

    function toggleActiveState(row){
        row.active = !row.active;
    }

</script>

<template>
    <div class="flex flex-col gap-1">
        <DataManagerRow 
        v-for="row in rows"
        :key="row.id"
        :telemetry-file="row"
        @delete-row="deleteRow"
        @toggle-active-state="toggleActiveState"/>
    </div>

</template>