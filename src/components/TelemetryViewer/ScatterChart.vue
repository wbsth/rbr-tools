<script setup lang="ts">
import { reactive, watch, ref, computed } from "vue";

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  filesSettings: {
    type: Object,
    required: true,
  },
  xUnit: {
    type: String,
    default: "",
  },
  yUnit: {
    type: String,
    default: "",
  },
  xLabel: {
    type: String,
    default: "",
  },
  yLabel: {
    type: String,
    default: "",
  },
});

const lineChart = ref();

watch(props.filesSettings, () => {
  // if (!lineChart.value.chart) {
  //   return;
  // }
  // const keys = Object.keys(lineChart.value.chart.series);
  // keys.forEach((element) => {
  //   const f = lineChart.value.chart.series[element];
  //   if (!props.filesSettings[f.options.fileId]) {
  //     return;
  //   }
  //   const visibilityToSet = props.filesSettings[f.options.fileId].active;
  //   if (visibilityToSet) {
  //     f.show();
  //   } else {
  //     f.hide();
  //   }
  // });
});

function handleResize() {
  lineChart.value.chart.reflow();
}
</script>

<template>
  <div class="w-full h-full">
    <resize-observer @notify="handleResize" />
    <highcharts
      class="w-full h-full"
      :options="chartData"
      ref="lineChart"></highcharts>
  </div>
</template>
