<script setup lang="ts">
import { watch, computed, ref } from "vue";
import { extractSetup } from "../tools/extractor.js";
import type { FileOperationResult } from "@/tools/misc";
import { fileSave, type FileWithHandle } from "browser-fs-access";

const props = defineProps<{
  file: FileWithHandle;
}>();

const extractResult = ref<FileOperationResult>();

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
  <div className="divider my-2" />
  <div>
    <div class="prose mb-2">
      <h3 class="mb-0">Setup file</h3>
      <p>
        {{ extractResult?.message == null ? "" : extractResult.message }}
      </p>
    </div>

    <div v-if="canShowDownloadButton">
      <button class="btn btn-neutral" @click="saveToDisk">Save to disk</button>
      <p class="bg-base-100 shadow-md p-3 rounded-md whitespace-pre-wrap mt-3">
        {{ decoder.decode(extractResult?.data ?? emptyArray) }}
      </p>
    </div>
  </div>
</template>

<style></style>
