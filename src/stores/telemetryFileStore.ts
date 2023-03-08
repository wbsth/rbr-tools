import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import {
  availableCharts,
  availableXAxisTypes,
  type IAvailableChart,
  type IAvailableAxisType,
} from "@/data/chartTypes";
import type { ITelemetryRawData } from "@/data/chartTypes";
import type { SeriesOptionsType } from "highcharts";

interface IFile {
  id: number;
  data: ITelemetryRawData[];
}

export interface IFileSettings {
  active: boolean;
  name: string;
  color: string;
}

interface IChartSettings {
  chartId: number;
  ySettings: IAvailableChart;
}

interface IChartMaterials {
  chartData: Highcharts.Options;
  xUnit: string;
  yUnit: string;
  xLabel: string;
  yLabel: string;
  settings: IChartSettings;
}

interface ITelemetrySettings {
  xAxis: IAvailableAxisType;
}

type ExtendedSeriesOptionsType = SeriesOptionsType & {
  fileId: number
};

export const telemetryFileStore = defineStore("telemetryFileStore", () => {
  const telemetrySettings = ref<ITelemetrySettings>({
    xAxis: availableXAxisTypes[0],
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
    chartMaterials.value.forEach((material, index) => {
      if (material.chartData.series) {
        const serieToUpdate = material.chartData.series.filter(
          (x) => {
          const xTemp = x as ExtendedSeriesOptionsType;
          return xTemp.fileId == file.id;
        });
        serieToUpdate[0].color = color;
      }
    });
  }

  function prepareChartData(settings: IChartSettings) {
    const xAxisSettings = telemetrySettings.value.xAxis;

    const filesArray = Array.from(files.value.values());

    const xAxisKey = xAxisSettings.fileColumnName as keyof ITelemetryRawData;
    const yAxisKey = settings.ySettings
      .fileColumnName as keyof ITelemetryRawData;

    const extractedData = filesArray.map(function (file) {
      // for each file
      const preparedData = file.data.map(function (rawData) {
        // for each data row in file
        const data: number[] = [
          parseFloat(rawData[xAxisKey] as string),
          parseFloat(rawData[yAxisKey] as string),
        ];

        return data;
      });

      const filteredData = preparedData.filter((pd) => {
        return !isNaN(pd[0]) && !isNaN(pd[1]);
      });

      const sortedData = filteredData.sort((x) => x[0]);

      const tempName = filesSettings.value.get(file.id)?.name ?? "?";
      const tempColor = filesSettings.value.get(file.id)?.color ?? "#FFFFFF";
      const returnObject: ExtendedSeriesOptionsType = {
        data: sortedData,
        lineWidth: 1,
        name: tempName,
        color: tempColor,
        type: "line",
        fileId: file.id
      };

      return returnObject;
    });

    const chartDataToSet = {
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
          text: `${settings.ySettings.label} [${settings.ySettings.unit}]`,
          style: {
            fontSize: "14px",
          },
        },
      },
      xAxis: {
        title: {
          text: `${xAxisSettings.label} [${xAxisSettings.unit}]`,
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
    };

    chartMaterials.value.set(settings.chartId, {
      chartData: chartDataToSet,
      xUnit: xAxisSettings.unit,
      yUnit: settings.ySettings.unit,
      xLabel: xAxisSettings.label,
      yLabel: settings.ySettings.label,
      settings: settings,
    });
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
