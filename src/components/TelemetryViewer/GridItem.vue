<script setup lang="ts">
import { ref, watch } from "vue";
import ScatterChart from "./ScatterChart.vue";

import { availableCharts } from "../../data/chartTypes";
import type { IAvailableChart } from "../../data/chartTypes";

import { telemetryFileStore } from "../../stores/telemetryFileStore";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["delete"]);
const store = telemetryFileStore();

function deleteThisWidget() {
  emit("delete", props.data);
}

const selectedChartType = ref<IAvailableChart>();

watch(selectedChartType, () => {
  if (selectedChartType.value) {
    store.prepareChartData({
      chartId: props.data.id,
      ySettings: selectedChartType.value,
      // // xAxis: "raceTime",
      // // xUnit: "s",
      // // xLabel: "Time",
      // yAxis: selectedChartType.value?.fileColumnName,
      // yUnit: selectedChartType.value?.unit,
      // yLabel: selectedChartType.value?.label,
    });
  }
});
</script>

<template>
  <div
    :id="data.id"
    :key="data.id"
    :gs-id="data.id"
    :gs-x="data.x"
    :gs-y="data.y"
    :gs-w="data.w"
    :gs-h="data.h">
    <div class="bg-neutral-700 grid-stack-item-content flex flex-col">
      <div
        class="grid grid-cols-2 bg-neutral-900 px-2 py-1 no-drag drag-target">
        <div>
          <select
            v-model="selectedChartType"
            name="cars"
            class="border text-sm rounded-sm block w-64 p-1 bg-neutral-800 border-gray-900 placeholder-gray-400 text-white focus:border-neutral-600 focus:ring-neutral-600">
            <option
              v-for="chart in availableCharts"
              :key="chart.fileColumnName"
              :value="chart">
              {{ chart.label }}
            </option>
          </select>
        </div>

        <div class="justify-self-end my-auto">
          <button @click="deleteThisWidget">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
      <p>{{ store.chartMaterials.get(data.id)?.yUnit }}</p>
      <div class="grow flex justify-center items-center overflow-hidden">
        <p v-if="!store.chartMaterials.get(props.data.id)" class="italic">
          no data
        </p>
        <ScatterChart
          v-else
          :chart-data="store.chartMaterials.get(data.id)?.chartData ?? {}"
          :files-settings="store.filesSettings"
          :x-unit="store.chartMaterials.get(data.id)?.xUnit"
          :y-unit="store.chartMaterials.get(data.id)?.yUnit"
          :x-label="store.chartMaterials.get(data.id)?.xLabel"
          :y-label="store.chartMaterials.get(data.id)?.yLabel" />
      </div>
    </div>
  </div>
</template>
