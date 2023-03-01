import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { availableCharts, availableXAxisTypes } from "@/data/chartTypes";
import { ITelemetryRawData } from "@/data/chartTypes";

// export enum xAxisType {
//   distance,
//   time,
// }

interface IFile {
  id: number;
  data: ITelemetryRawData[];
}

interface IFileSettings {
  active: boolean;
  name: string;
  color: string;
}

interface IChartSettings {
  chartId: number;
  xAxis: "raceTime";
  xUnit: "s";
  xLabel: "Time";
  yAxis: string;
  yUnit: string;
  yLabel: string;
}

interface IChartMaterials {
  xUnit: string;
  yUnit: string;
  xLabel: string;
  yLabel: string;
  settings: IFileSettings;
}

export const telemetryFileStore = defineStore("telemetryFileStore", () => {
  const telemetrySettings = ref({
    xAxisMode: "raceTime",
  });

  const files = ref(new Map<number, IFile>());

  const filesSettings = ref(new Map<number, IFileSettings>());

  const chartMaterials = ref(new Map<number, IChartMaterials>());

  const newFileId = computed(() => {
    if (files.value == undefined) {
      return 0;
    }
    const valuesArray = Array.from(files.value.values());
    const idValuesArray = valuesArray.map((x) => x.id);

    if (idValuesArray.length == 0) return 0;

    return Math.max(...idValuesArray) + 1;
  });

  function addNewFile(file: IFile, options: IFileSettings) {
    file.id = newFileId.value;

    files.value?.set(file.id, file);
    filesSettings.value?.set(file.id, options);

    reloadCharts();
  }

  function deleteFile(file: IFile) {
    files.value?.delete(file.id);
    filesSettings.value?.delete(file.id);

    reloadCharts();
  }

  function toggleActiveState(file: IFile) {
    const fileToModify = filesSettings.value.get(file.id);
    if (fileToModify != undefined) {
      fileToModify.active = !fileToModify.active;
    }
  }

  function changeColor(file: IFile, color: string) {
    const fileToModify = filesSettings.value.get(file.id);
    if (fileToModify != undefined) {
      fileToModify.color = color;
    }

    // TODO DOKONCZYC

    // const keys = Object.keys(chartMaterials.value);
    // keys.forEach((element) => {
    //   const f = chartMaterials.value[element];
    //   const serieToUpdate = f.chartData.series.filter(
    //     (x) => x.fileId == file.id
    //   );
    //   serieToUpdate[0].color = color;
    // });
  }

  function prepareChartData(settings: IChartSettings) {
    const xAxisSettings = availableXAxisTypes.filter(
      (x) => x.fileColumnName == telemetrySettings.value.xAxisMode
    )[0];

    const filesArray = Array.from(files.value.values());

    filesArray.map((file) => {
      const test = file.data;
      const nameToAccess = xAxisSettings.fileColumnName;
      test[0][nameToAccess];

      const preparedData = file.data.map((rawData) => {
        [
          parseFloat(rawData[xAxisSettings.fileColumnName]),
          parseFloat(rawData[settings.yAxis]),
        ];
      });

      const filteredData = preparedData.filter((pd) => {
        !isNaN(pd[0]) && !isNaN(pd[1]);
      });
    });
    // const extractedData = Object.values(files.value).map((file) => {
    //   let preparedData = file.data.map((f) => [
    //     parseFloat(f[xAxisSettings.xAxis]),
    //     parseFloat(f[settings.yAxis]),
    //   ]);

    //   const filteredData = preparedData.filter(
    //     (x) => !isNaN(x[0]) && !isNaN(x[1])
    //   );

    //   const sortedData = filteredData.sort((x) => x[0]);

    //   return {
    //     data: sortedData,
    //     lineWidth: 1,
    //     name: filesSettings.value[file.id].name,
    //     color: filesSettings.value[file.id].color,
    //     fileId: file.id,
    //   };
    // });

    chartMaterials.value[settings.chartId] = {
      chartData: {
        chart: {
          type: "line",
          animation: false,
          zoomType: "xy",
        },
        series: extractedData,
        boost: {
          enabled: true,
          useGPUTranslations: true,
        },
        yAxis: {
          title: {
            text: `${settings.yLabel} [${settings.yUnit}]`,
            style: {
              fontSize: "14px",
            },
          },
        },
        xAxis: {
          title: {
            text: `${xAxisSettings.xLabel} [${xAxisSettings.xUnit}]`,
            style: {
              fontSize: "14px",
            },
          },
          crosshair: true,
        },
        title: {
          text: "",
          margin: 5,
        },
      },
      xUnit: xAxisSettings.xUnit,
      yUnit: settings.yUnit,
      xLabel: xAxisSettings.xLabel,
      yLabel: settings.yLabel,
      settings: settings,
    };
  }

  function reloadCharts() {
    chartMaterials.value.forEach((x) => {
      prepareChartData(x.settings);
    });
  }

  return {
    files,
    addNewFile,
    deleteFile,
    toggleActiveState,
    changeColor,
    newFileId,
    prepareChartData,
    chartMaterials,
    filesSettings,
    telemetrySettings,
    reloadCharts,
  };
});
