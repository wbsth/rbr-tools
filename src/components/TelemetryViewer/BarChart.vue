<script setup>
import { reactive } from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

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
    parsing: false,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    plugins:{
      tooltip:{
        enabled: true
      }
    }
})

</script>

<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="props.chartData"
      type="scatter"
    />
  </template>