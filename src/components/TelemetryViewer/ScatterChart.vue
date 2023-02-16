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
      default: ""
    },
    yUnit:{
      type: String,
      default: ""
    },
    xLabel:{
      type: String,
      default: ""
    },
    yLabel:{
      type: String,
      default: ""
    },
});


watch(props.chartData, (newValue, oldValue) => {
  console.log('smth changed!');
}, { immediate: true });

const options = ref({
  chart: {
    id: 'vuechart-example',
    animations: {
      enabled: false
    }
  },
  xaxis: {
    type: 'numeric',
    title:{
      text: `${props.xLabel} [${props.xUnit}]`
    }
  },
  yaxis: {
    type: 'numeric',
    title:{
      text: `${props.yLabel} [${props.yUnit}]`
    }
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

const lineChart = ref({});

function testFunction(){
  lineChart.value.toggleSeries("test");  
}

</script>

<template>
  <div class="h-full w-full">
    <apexchart ref="lineChart" width="100%" height="100%" type="line" :options="options" :series="chartData"/>
  </div>
  <p @click="testFunction">aaaaa</p>
</template>