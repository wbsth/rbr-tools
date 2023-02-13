<script setup>
    import Papa from 'papaparse';
    import { fileOpen, supported } from "browser-fs-access";

    import DataManagerRow from "./DataManagerRow.vue";
    import { telemetryFileStore } from "../../stores/telemetryFileStore.js"
    
    import colors from '../../data/colors';

    const fileStore = telemetryFileStore();
    
    let addedFilesCount = 0;
    async function LoadData(){
        const file = await fileOpen({
            description: "RBR Telemetry File",
            extensions: ['.tsv']
        });
        
        let rawFile = null;

        Papa.parse(file, {
            header: true,
            complete: function(results){
                rawFile = results.data;
                const newColor = colors.colors[addedFilesCount];
                const newFile = {
                    active: true,
                    name: file.name,
                    color: newColor,
                    data: rawFile
                };
                fileStore.addNewFile(newFile);
                addedFilesCount += 1;
                addedFilesCount %= colors.colors.length;
            }
        })
    }

//     async function LoadNewReplayFile(){
//   const file = await fileOpen({
//     description: "RBR Telemetry File",
//     extensions: ['.tsv']
//   });
//   telemetryFile.file = file;

//   Papa.parse(file, {
//     header: true,
//     complete: function(results) {

// 		  let extractedData = results.data.map(x=>(
//         {
//           x: parseFloat(x.raceTime),
//           y: parseFloat(x["speed"])
//         }
//       ));

//       let newData = {
//           datasets: [{ 
//             data: extractedData,
//             radius:0,
//             showLine: true,
//             borderWidth: 1,
//             borderColor: '#FFA07A'
//           }]
//       }
//       chartData.value = newData;
// 	  }
//   });

</script>

<template>
    <button class="bg-neutral-700 px-4 py-2 mb-2 rounded-md cursor-pointer hover:bg-neutral-600 inline-block" @click="LoadData">
        <p>Load data</p>
    </button>

    <div class="flex flex-col gap-1">
        <DataManagerRow 
        v-for="file in fileStore.files"
        :key="file.id"
        :telemetry-file="file"
        @delete-row="fileStore.deleteFile"
        @toggle-active-state="fileStore.toggleActiveState"
        @change-color="fileStore.changeColor"/>
    </div>
</template>