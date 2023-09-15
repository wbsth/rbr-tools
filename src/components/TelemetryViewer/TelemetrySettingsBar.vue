<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { telemetryFileStore } from "@/stores/telemetryFileStore";
import { appSettingsStore } from "@/stores/appSettingsStore";
import { availableXAxisTypes } from "@/data/chartTypes";

const store = telemetryFileStore();
const settingsStore = appSettingsStore();

const distanceActive = ref(true);

function distanceClicked() {
  distanceActive.value = true;
  if (store.telemetrySettings.xAxis != availableXAxisTypes[0]) {
    store.telemetrySettings.xAxis = availableXAxisTypes[0];
    store.reloadCharts();
  }
}

function timeClicked() {
  distanceActive.value = false;
  if (store.telemetrySettings.xAxis != availableXAxisTypes[0]) {
    store.telemetrySettings.xAxis = availableXAxisTypes[1];
    store.reloadCharts();
  }
}

function switchLayout(switchToWide: boolean) {
  settingsStore.wideViewEnabled = switchToWide;
}

onUnmounted(() => {
  settingsStore.wideViewEnabled = false;
});
</script>

<template>
  <div class="flex flex-row items-center mb-1">
    <p class="font-bold">Telemetry settings:</p>

    <div class="flex flex-row items-center flex-wrap gap-2">
      <div class="flex flex-row gap-2 items-center">
        <p class="ml-4">Y axis:</p>

        <button
          class="btn btn-neutral btn-sm"
          :class="{ 'opacity-40': !distanceActive }"
          @click="distanceClicked">
          distance
        </button>

        <button
          class="btn btn-neutral btn-sm"
          :class="{ 'opacity-40': distanceActive }"
          @click="timeClicked">
          time
        </button>
      </div>

      <div class="xl:flex flex-row gap-2 items-center hidden">
        <p class="ml-4">Layout:</p>

        <button
          class="btn btn-neutral btn-sm"
          :class="{ 'opacity-40': settingsStore.wideViewEnabled }"
          @click="switchLayout(false)">
          narrow
        </button>

        <button
          class="btn btn-neutral btn-sm"
          :class="{ 'opacity-40': !settingsStore.wideViewEnabled }"
          @click="switchLayout(true)">
          wide
        </button>
      </div>
    </div>
  </div>
</template>
