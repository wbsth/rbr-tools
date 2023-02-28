<script setup lang="ts">
import { parse } from "papaparse";
import { fileOpen, supported } from "browser-fs-access";

import DataManagerRow from "./DataManagerRow.vue";
import { telemetryFileStore } from "../../stores/telemetryFileStore.js";

import colors from "../../data/colors";

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
    complete: function (results) {
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
  <button
    class="bg-neutral-700 px-4 py-2 mb-2 rounded-md cursor-pointer hover:bg-neutral-600 inline-block"
    @click="LoadData">
    <p>Load data</p>
  </button>

  <div class="flex flex-col gap-1">
    <DataManagerRow
      v-for="file in fileStore.files"
      :key="file[0]"
      :telemetry-file="file"
      :file-settings="fileStore.filesSettings[file[0]]"
      @delete-row="fileStore.deleteFile"
      @toggle-active-state="fileStore.toggleActiveState"
      @change-color="fileStore.changeColor" />
  </div>
</template>
