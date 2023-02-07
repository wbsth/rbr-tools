<script setup>
import { ref, reactive, onMounted } from "vue";
import { fileOpen, supported } from "browser-fs-access";

import { GridStack } from "gridstack";

import Papa from 'papaparse';

import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";

import GridItem from '../components/TelemetryViewer/GridItem.vue';

import BarChart from "../components/TelemetryViewer/BarChart.vue"

const telemetryFile = reactive({ file: null });

// default widgets
const widgets = ref([
  {
    id: 1,
    title: "First Widget",
    grid: {
      x: 0,
      y: 0,
      w: 1,
      h: 6,
    },
  },
  {
    id: 2,
    title: "Second Widget",
    grid: {
      x: 0,
      y: 0,
      w: 1,
      h: 6,
    },
  },
]);

// widgets grid
const grid = ref(null);

function initGridStack() {
  grid.value = GridStack.init({
    column: 1,
    cellHeight: 100,
    minRow: 1,
    margin: 10,
  });
  makeWidgets(widgets.value);
}

function makeWidgets(widgets) {
  widgets.forEach((widget) => {
    makeWidget(widget);
  });
}

function makeWidget(item) {
  const elementSelector = `#${item.id}`;
  return grid.value.makeWidget(elementSelector);
}

function deleteWidget(widget) {
  const index = widgets.value.findIndex((w) => w.id === widget.id);
  if (index === -1) {
    return;
  }
  const selector = `#${CSS.escape(widget.id)}`;
  grid.value.removeWidget(selector);
  widgets.value.splice(index, 1);
  grid.value.compact();
}

const chartData = reactive({
    labels: [ 'January', 'February', 'March' ],
    datasets: [{ 
        data: [{
      x: -10,
      y: 0
    }, {
      x: 0,
      y: 10
    }, {
      x: 10,
      y: 5
    }, {
      x: 0.5,
      y: 5.5
    }],
    showLine: false
    }]
})

async function LoadNewReplayFile(){
  const file = await fileOpen({
    description: "RBR Telemetry File",
    extensions: ['.tsv']
  });
  telemetryFile.file = file;

  Papa.parse(file, {
    header: true,
    complete: function(results) {
      console.log(results)
		  const extractedData = results.data.map(x=>(
        {
          x: parseFloat(x.raceTime),
          y: parseFloat(x["LF.temperature"])
        }
      ));
      Object.assign(chartData.datasets[0].data, extractedData);
	  }
  });

}

onMounted(() => {
  initGridStack();
});
</script>

<template>
  <div class="bg-neutral-800 rounded-md p-4">
    <h1 class="font-bold text-3xl">Telemetry analyzer</h1>

    <div class="flex flex-row content-center py-3 gap-3">
      <button class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600 inline-block" @click="LoadNewReplayFile">
        <p>Choose telemetry file</p>
      </button>

      <div class="flex justify-center items-center italic">
        {{ telemetryFile.file == null ? "no file chosen..." : telemetryFile.file.name }}
      </div>
    </div>

    <BarChart :chart-data="chartData"/>

    <div class="grid-stack">
      <GridItem
        v-for="widget in widgets"
        :key="widget.id"
        :data="widget"
        @delete="deleteWidget"
      />
    </div>
  </div>
</template>
