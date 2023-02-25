<script setup lang="ts">
import { watch, computed, ref } from "vue";
import { extractSetup, type ExtractionResult } from "../tools/extractor.js";
import { fileSave, type FileWithHandle } from "browser-fs-access";

const props = defineProps<{
  file: FileWithHandle;
}>();

const extractResult = ref<ExtractionResult>();

const canShowDownloadButton = computed(() => {
  return extractResult.value?.message != null
    ? !extractResult.value.failed
    : false;
});

async function saveToDisk() {
  const fileName =
    props.file.name.substring(0, props.file.name.lastIndexOf(".")) ||
    props.file.name;

  if (extractResult.value != null) {
    var blob = new Blob([extractResult.value.data], { type: "example/binary" });

    await fileSave(blob, {
      fileName: fileName,
      extensions: [".lsp"],
      description: "RBR Setup File",
    });
  }
}

async function handleExtractForNewFile(file: FileWithHandle) {
  const tempRes = await extractSetup(file);
  extractResult.value = tempRes;
}

const decoder = new TextDecoder();
const emptyArray = new Uint8Array([]);

watch(
  () => props.file,
  async (file) => {
    await handleExtractForNewFile(file);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <hr class="border-neutral-600" />
  <div>
    <h1 class="font-bold text-lg">Setup file</h1>
    <p class="mb-2">
      {{ extractResult?.message == null ? "" : extractResult.message }}
    </p>
    <div v-if="canShowDownloadButton">
      <button
        class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600"
        @click="saveToDisk">
        Save to disk
      </button>
      <p class="bg-neutral-900 p-3 rounded-md whitespace-pre-wrap mt-3">
        {{ decoder.decode(extractResult?.data ?? emptyArray) }}
      </p>
    </div>
  </div>
</template>

<style></style>
