import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import chartTypes from "../data/chartTypes";

export const telemetryFileStore = defineStore("telemetryFileStore", () => {
  const telemetrySettings = ref({
    xAxisMode: 0,
  });

  const files = ref({});

  const filesSettings = ref({});

  const chartMaterials = ref({});

  const newFileId = computed(() => {
    const idValues = Object.values(files.value).map((x) => x.id);
    if (idValues.length == 0) return 0;
    return Math.max(...idValues) + 1;
  });

  function addNewFile(file, options) {
    file.id = newFileId.value;
    files.value[file.id] = file;
    filesSettings.value[file.id] = options;

    reloadCharts();
  }

  function deleteFile(file) {
    delete files.value[file.id];
    delete filesSettings.value[file.id];

    reloadCharts();
  }

  function toggleActiveState(file) {
    filesSettings.value[file.id].active = !filesSettings.value[file.id].active;
  }

  function changeColor(file, color) {
    filesSettings.value[file.id].color = color;

    const keys = Object.keys(chartMaterials.value);
    keys.forEach((element) => {
      const f = chartMaterials.value[element];
      const serieToUpdate = f.chartData.series.filter(
        (x) => x.fileId == file.id
      );
      serieToUpdate[0].color = color;
    });
  }

  function prepareChartData(settings) {
    const xAxisSettings = chartTypes.xAxis.filter(
      (x) => x.id == telemetrySettings.value.xAxisMode
    )[0];

    const extractedData = Object.values(files.value).map((file) => {
      let preparedData = file.data.map((f) => [
        parseFloat(f[xAxisSettings.xAxis]),
        parseFloat(f[settings.yAxis]),
      ]);

      const filteredData = preparedData.filter(
        (x) => !isNaN(x[0]) && !isNaN(x[1])
      );

      const sortedData = filteredData.sort((x) => x[0]);

      return {
        data: sortedData,
        lineWidth: 1,
        name: filesSettings.value[file.id].name,
        color: filesSettings.value[file.id].color,
        fileId: file.id,
      };
    });

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
    const keys = Object.keys(chartMaterials.value);
    keys.forEach((key) => {
      const settings = {};
      Object.assign(settings, chartMaterials.value[key].settings);
      prepareChartData(settings); //chartMaterials.value[key] = prepareChartData(chartMaterials.value[key].settings);
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
