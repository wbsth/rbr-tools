<script setup>
    import { ref } from 'vue';
    import { telemetryFileStore } from '../../stores/telemetryFileStore';

    const store = telemetryFileStore();

    const distanceActive = ref(true);

    function distanceClicked(){
        distanceActive.value = true;
        if(store.telemetrySettings.xAxisMode != 0){
            store.telemetrySettings.xAxisMode = 0
            store.reloadCharts();
        }
        
    }

    function timeClicked(){
        distanceActive.value = false;
        if(store.telemetrySettings.xAxisMode != 1){
            store.telemetrySettings.xAxisMode = 1
            store.reloadCharts();
        }
    }

</script>

<template>
    <div class="flex flex-row items-center mb-1">
      <p class="font-bold">Telemetry settings:</p>   
      
      <div class="flex flex-row gap-2 items-center">
        <p class="ml-4">Y axis:</p>

        <button 
            class="bg-neutral-700 rounded-md cursor-pointer hover:bg-neutral-600 py-0.5 px-1"
            :class="{ 'opacity-40':!distanceActive}"
            @click="distanceClicked">
            distance
        </button>

        <button class="bg-neutral-700 rounded-md cursor-pointer hover:bg-neutral-600 py-0.5 px-1"
        :class="{ 'opacity-40':distanceActive}"
        @click="timeClicked">time</button>
      </div>
    </div>
</template>