<script setup>
import DataManager from "../components/TelemetryViewer/DataManager.vue";
import GridManager from "../components/TelemetryViewer/GridManager.vue";
</script>

<template>
  <div class="bg-neutral-800 rounded-md p-4">
    <h1 class="font-bold text-3xl mb-2">Telemetry analyzer</h1>

    <DataManager/>

    <hr class="my-2 border-slate-400"/>

    <GridManager/>

  </div>
</template>
