<script setup lang="ts">
import {ref} from "vue";
import {fileOpen, type FileWithHandle} from "browser-fs-access";
import SetupComparison from "@/components/SetupComparison.vue";

const setupFile = ref<FileWithHandle>();
const setupFileForComparison = ref<FileWithHandle>();

async function loadSetupFile() {
  const file = await fileOpen({
    description: "RBR Setup File",
    extensions: [".lsp"],
  });
  setupFile.value = file;
}

async function loadSetupFileForComparison() {
  const file = await fileOpen({
    description: "RBR Setup File",
    extensions: [".lsp"],
  });
  setupFileForComparison.value = file;
}
</script>

<template>
  <div class="rounded-md p-8">
    <div class="prose">
      <h1>Setup Analyzer</h1>
      <p>
        This tool allows you to preview and compare setup values from two setups.
      </p>
      <p>
        All files are processed on the client side - no files are being sent to
        the server.
      </p>
      <p class="italic text-sm">
        Warning: use only setups for the same car.
      </p>
    </div>

    <div class="flex flex-row content-center gap-3 py-3">
      <button class="btn btn-neutral w-44" @click="loadSetupFile">
        Choose setup file
      </button>

      <div class="flex justify-center items-center italic">
        {{ setupFile == null ? "no file chosen..." : setupFile.name }}
      </div>
    </div>

    <div class="flex flex-row content-center gap-3 pb-3">
      <button class="btn btn-neutral w-44" @click="loadSetupFileForComparison">
        Choose setup file for comparison
      </button>

      <div class="flex justify-center items-center italic">
        {{ setupFileForComparison == null ? "no file chosen..." : setupFileForComparison.name }}
      </div>
    </div>

    <SetupComparison :setup-file="setupFile"
    :setup-file-for-comparison="setupFileForComparison"/>
  </div>
</template>