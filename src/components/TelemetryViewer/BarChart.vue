<script setup>
import { reactive } from 'vue';
import { Line, Scatter } from 'vue-chartjs'
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, zoomPlugin)

const props = defineProps({
    chartData:{
        type: Object,
        default: ()=>{},
        required:true
    }
});

const chartOptions = reactive({
    responsive: true,
    animation: false,
    maintainAspectRatio: true,
    parsing: true,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    plugins:{
      tooltip:{
        enabled: true
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
        }
      }
    }
});

</script>

<template>
    <Scatter
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"            
    />
</template>