<script setup lang="ts">
import { parse } from "papaparse";
import type { ParseResult } from "papaparse";

import { fileOpen } from "browser-fs-access";

import DataManagerRow from "./DataManagerRow.vue";
import { telemetryFileStore } from "@/stores/telemetryFileStore.js";
import type { ITelemetryRawData } from "@/data/chartTypes";

import colors from "@/data/colors";

const fileStore = telemetryFileStore();

let addedFilesCount = 0;
async function LoadData() {
  const file = await fileOpen({
    description: "RBR Telemetry File",
    extensions: [".tsv"],
  });

  let rawFile = null;

  parse(file, {
    header: true,
    complete: function (results: ParseResult<ITelemetryRawData>) {
      rawFile = results.data;
      const newColor = colors.colors[addedFilesCount];

      const newFile = {
        id: 0,
        data: rawFile,
      };

      const options = {
        active: true,
        name: file.name,
        color: newColor,
      };

      fileStore.addNewFile(newFile, options);
      addedFilesCount += 1;
      addedFilesCount %= colors.colors.length;
    },
  });
}
</script>

<template>
  <button class="btn btn-neutral btn-sm" @click="LoadData">Load data</button>

  <div class="flex flex-col gap-2 mt-2">
    <DataManagerRow
      v-for="file in fileStore.files"
      :key="file[0]"
      :telemetry-file="file[1]"
      :file-settings="fileStore.filesSettings.get(file[0])"
      @delete-row="fileStore.deleteFile"
      @toggle-active-state="fileStore.toggleActiveState"
      @change-color="fileStore.changeColor" />
  </div>
</template>
