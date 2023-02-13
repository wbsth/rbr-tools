<script setup>
import { ref, watch } from "vue";
import ScatterChart from "./ScatterChart.vue";

import chartTypes from "../../data/chartTypes";
import { telemetryFileStore } from "../../stores/telemetryFileStore";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isEditing: Boolean,
});

const emit = defineEmits(["delete"]);
const store = telemetryFileStore()

function deleteThisWidget() {
  emit("delete", props.data);
}

const selectedChartType = ref({});
const chartData = ref({});
const xUnit = ref();
const yUnit = ref();


watch(selectedChartType, ()=>{
  const temp = store.prepareChartData("raceTime", selectedChartType.value.columnName);
  chartData.value = temp;

  xUnit.value = "s";
  yUnit.value = selectedChartType.value.unit;
})

</script>

<template>
  <div :id="data.id" :key="data.id" :gs-id="data.id" :gs-x="data.grid.x" :gs-y="data.grid.y" :gs-w="data.grid.w"
    :gs-h="data.grid.h">
    <div class="bg-neutral-700 grid-stack-item-content flex flex-col">
      <div class="grid grid-cols-2 bg-neutral-900 px-2 py-1 no-drag drag-target">
        <div>
          <select v-model="selectedChartType" name="cars" class="border text-sm rounded-sm block w-64 p-1 bg-neutral-800 border-gray-900 placeholder-gray-400 text-white focus:border-neutral-600 focus:ring-neutral-600">
            <option v-for="chart in chartTypes.charts" :key="chart.id" :value="chart">{{ chart.uiName }}</option>
          </select>
        </div>

        <div class="justify-self-end my-auto">
          <button @click="deleteThisWidget">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
      <div class="grow flex justify-center items-center">

        <p
          v-if="Object.keys(chartData).length === 0"
          class="italic">no data
        </p>
        
        <ScatterChart v-else :chart-data="chartData" :x-unit="xUnit" :y-unit="yUnit"/>    
      </div>
    </div>
  </div>
</template>
