<script setup>
import { reactive, watch, ref, computed } from 'vue';

const props = defineProps({
    chartData:{
      type: Object,
      required:true
    },
    filesSettings:{
      type: Object,
      required: true
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
    }
});


// watch(props.chartData, (newValue, oldValue) => {
//   console.log('smth changed!');
// }, { immediate: true });

// const options = ref({
//   chart: {
//     id: 'vuechart-example',
//     group: 'test',
//     animations: {
//       enabled: false
//     }
//   },
//   xaxis: {
//     type: 'numeric',
//     title:{
//       text: `${props.xLabel} [${props.xUnit}]`
//     }
//   },
//   yaxis: {
//     type: 'numeric',
//     title:{
//       text: `${props.yLabel} [${props.yUnit}]`
//     },
//     labels: {
//       formatter: function (val) {
//         return val.toFixed(0)
//       }
//     }
//   },
//   markers: {
//     size: 0,
//   },
//   stroke: {
//     width: 1,
//     curve: 'straight',
//   },
//   grid:{
//     padding:{
//       top: 10,
//       right: 10,
//       bottom: 10,
//       left: 10
//     }
//   },
//   theme:{
//     mode: 'dark'
//   },
//   tooltip:{
//     shared: true,
//     enabled: true
//     // marker:{
//     //   strokeColor: ['#000000','#00FF00'],
//     //   fillColors: ['#000000','#00FF00'],
//     // }
//   },
//   dataLabels:{
//     enabled: false
//   }
// })

const lineChart = ref({});

function testFunction(){ 
  console.log(props.chartData)
}

// const filesSettingsComputed = computed(() => Object.assign({}, props.filesSettings));

// watch(filesSettingsComputed, (newValue, oldValue) => {
//   // const oldColors = Object.values(oldValue).map(x=>x.color);
//   // const newColors = Object.values(newValue).map(x=>x.color);
//   console.log(oldValue);
//   console.log(newValue);
//   // let difference = oldColors.filter(x => !newColors.includes(x));
//   // console.log(difference);
//   // lineChart.value.updateOptions({
//   //   stroke: {
//   //     colors: Object.values(newValue).map(x=>x.color)
//   //   }
//   // })
//   // console.log(Object.values(newValue));
//   // for(const object in Object.values(newValue)){
//   //   console.log(object);
//   // }

// });

</script>

<template>
  <div class="h-full w-full">
    <!-- <apexchart ref="lineChart" width="100%" height="100%" type="line" :options="options" :series="chartData"/> -->
    <highcharts :options="chartData"></highcharts>
  </div>
</template>