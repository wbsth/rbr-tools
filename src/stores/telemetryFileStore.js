import { defineStore } from "pinia";
import { computed, ref } from 'vue';

export const telemetryFileStore = defineStore('telemetryFileStore', () => {

    const files = ref([

    ]);
    
    const chartMaterials = ref({

    });

    const newFileId = computed(() => {
        const idValues = files.value.map(x=>x.id);
        if (idValues.length == 0) return 0;
        return Math.max(...idValues) + 1;
    });

    function addNewFile(file){
        file.id = newFileId.value;
        files.value.push(file);
    }

    function deleteFile(file){
        const index = files.value.findIndex((r) => r.id === file.id);
        if (index === -1) {
            return;
        }
        files.value.splice(index, 1);
    }

    function toggleActiveState(file){
        file.active = !file.active;
    }

    function changeColor(file, color){
        file.color = color;
    }

    function prepareChartData(settings){
        const extractedData = files.value.map(file=> {
            
            let preparedData = file.data.flatMap(
                function(data){
                    const yParsed = parseFloat(data[settings.yAxis]);
                    const xParsed = parseFloat(data[settings.xAxis]);
        
                    if(!isNaN(yParsed) && !isNaN(xParsed))
                        return {
                            x:xParsed, y:yParsed
                        }
                    else{
                        return []
                    }
                }
            );

            return {
              data: preparedData,
              name: "test"
            };
        })
        
        chartMaterials.value[settings.chartId] = {
            chartData: extractedData,
            xUnit: settings.xUnit,
            yUnit: settings.yUnit,
            xLabel: settings.xLabel,
            yLabel: settings.yLabel        
        };
    }

    return { files, addNewFile, deleteFile, toggleActiveState, changeColor, newFileId, prepareChartData, chartMaterials};

});
