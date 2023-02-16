<script setup>
import { reactive, watch, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
    chartData:{
      type: Object,
      required:true
    },
    xUnit:{
      type: String,
      default: "s"
    },
    yUnit:{
      type: String,
      default: "rpm"
    }
});


watch(props.chartData, (newValue, oldValue) => {
  console.log('test')
  // chartOptions.plugins.zoom.limits.x.min = 100;
}, { immediate: true });

const options = ref({
  chart: {
    id: 'vuechart-example',
    animations: {
      enabled: false
    }
  },
  xaxis: {
    type: 'numeric'
  },
  yaxis: {
    type: 'numeric',
    // labels: {
    //   formatter: function (val) {
    //     return val.toFixed(0)
    //   }
    // }
  },
  markers: {
    size: 0,
  },
  stroke: {
    width: 1,
    curve: 'straight',
  },
  grid:{
    padding:{
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    }
  },
  theme:{
    mode: 'dark'
  },
  tooltip:{
    shared: true,
    // marker:{
    //   strokeColor: ['#000000','#00FF00'],
    //   fillColors: ['#000000','#00FF00'],
    // }
  }
})
</script>

<template>
  <div class="h-full w-full">
    <apexchart width="100%" height="100%" type="line" :options="options" :series="chartData"></apexchart>
  </div>
</template>