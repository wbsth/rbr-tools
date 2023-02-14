<script setup>
import { reactive, watch } from 'vue';
import { Scatter } from 'vue-chartjs'
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, zoomPlugin)

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

const chartOptions = reactive({
    responsive: true,
    animation: false,
    maintainAspectRatio: false,
    parsing: true,
    scales:{
      x:{
        min: 50,
        max: 200
      },
      y:{
        min: 0,
        max: 200
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    plugins:{
      tooltip:{
        enabled: true,
        callbacks:{
          label: function(context){
            return `${context.parsed.x}[${props.xUnit}] - ${context.parsed.y}[${props.yUnit}]`
          }
        }
      },
      zoom:{
        zoom:{
          wheel:{
            enabled: true,
          },
          pinch:{
            enabled: true
          },
          mode: 'xy'
        },
        pan:{
          enabled: true,
        },
        limits:{
          x: {
            min: 50,
            max: 200
          },
          y: {
            min: 0,
            max: 200
          }
        }
      }
    }
});

watch(props.chartData, (newValue, oldValue) => {
  const xMax = props.chartData.datasets[0].data.map(set=>set.x);
  // chartOptions.plugins.zoom.limits.x.min = 100;
}, { immediate: true });

</script>

<template>
  <div class="h-full w-full">
    <Scatter
      v-if="chartData"
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"            
    />
  </div>
</template>