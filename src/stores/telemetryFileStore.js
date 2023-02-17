import { defineStore } from "pinia";
import { computed, ref } from 'vue';

export const telemetryFileStore = defineStore('telemetryFileStore', () => {

    const files = ref({

    });
    
    const filesSettings = ref({

    });

    const chartMaterials = ref({

    });

    const newFileId = computed(() => {
        const idValues = Object.values(files.value).map(x=>x.id);
        if (idValues.length == 0) return 0;
        return Math.max(...idValues) + 1;
    });

    function addNewFile(file, options){
        file.id = newFileId.value;
        files.value[file.id] = file;
        filesSettings.value[file.id] = options;
    }

    function deleteFile(file){
        delete files.value[file.id];
        delete filesSettings.value[file.id];
    }

    function toggleActiveState(file){
        filesSettings.value[file.id].active = !filesSettings.value[file.id].active;
    }

    function changeColor(file, color){
        filesSettings.value[file.id].color = color;
    }

    function prepareChartData(settings){
        const extractedData = Object.values(files.value).map(file=> {
            
            let preparedData = file.data.map(f=>
                [parseFloat(f[settings.xAxis]), parseFloat(f[settings.yAxis])]
                );

            let filteredData = preparedData.filter(x=>!isNaN(x[0]) && !isNaN(x[1]));

            return {
              data: filteredData,
              lineWidth: 0.5,
              name: filesSettings.value[file.id].name,
              color: filesSettings.value[file.id].color,
              fileId: file.id
            };
        })
        
        chartMaterials.value[settings.chartId] = {
            chartData: {
                chart:{
                    type: "line",
                    animation: false,
                    zoomType: 'xy'
                },
                series: extractedData,
                boost: {
                    enabled: true,
                    useGPUTranslations: true
                },
                yAxis:{
                    title:{
                        text: `${settings.yLabel} [${settings.yUnit}]`
                    }
                },
                xAxis:{
                    title:{
                        text: `${settings.xLabel} [${settings.xUnit}]`
                    },
                    crosshair: true
                },
                title:{
                    text: "",
                    margin: 5
                }
            },
            xUnit: settings.xUnit,
            yUnit: settings.yUnit,
            xLabel: settings.xLabel,
            yLabel: settings.yLabel,        
        };
    }

    return { files, addNewFile, deleteFile, toggleActiveState, changeColor, newFileId, prepareChartData, chartMaterials, filesSettings};

});
