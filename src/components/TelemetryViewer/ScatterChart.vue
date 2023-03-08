<script setup lang="ts">
import { reactive, watch, ref, computed, toRaw } from "vue";
import type { IFileSettings } from "@/stores/telemetryFileStore";

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
  if (!lineChart.value.chart) {
    return;
  }
  const keys = Object.keys(lineChart.value.chart.series);
  keys.forEach((element) => {
    const parsed = parseInt(element);
    const f = lineChart.value.chart.series[element];
    const rawSettings = toRaw(props.filesSettings) as Map<number, IFileSettings>;

    if (!rawSettings.get(f.options.fileId)) {
      return;
    }
    const visibilityToSet = rawSettings.get(f.options.fileId)?.active;
    if (visibilityToSet) {
      f.show();
    } else {
      f.hide();
    }
  });
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
