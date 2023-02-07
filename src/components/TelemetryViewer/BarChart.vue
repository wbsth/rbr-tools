<script setup>
import { reactive } from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

const props = defineProps({
    chartData:{
        type: Object,
        default: ()=>{}
    }
});

const chartOptions = reactive({
    responsive: true
})

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
    showLine: true
    }]
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