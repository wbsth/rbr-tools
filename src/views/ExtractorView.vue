<script setup lang="ts">
import { ref } from "vue";
import { fileOpen, type FileWithHandle } from "browser-fs-access";
import SetupPreview from "../components/SetupPreview.vue";

const fileData = ref<FileWithHandle>();

async function LoadNewReplayFile() {
  const file = await fileOpen({
    description: "RBR Replay File",
    extensions: [".rpl"],
  });
  fileData.value = file;
}
</script>

<template>
  <div class="bg-neutral-800 rounded-md p-4">
    <h1 class="font-bold text-3xl">Setup extractor</h1>
    <p class="text-sm italic">
      This simple tool allows you to extract setup file from Richard Burns Rally
      replay file (.rpl).
    </p>
    <p class="text-sm italic">
      All files are processed on the client side - no files are being sent to
      the server.
    </p>

    <div class="flex flex-row content-center py-3 gap-3">
      <button
        class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600 inline-block"
        @click="LoadNewReplayFile">
        <p>Choose replay file</p>
      </button>

      <div class="flex justify-center items-center italic">
        {{ fileData == null ? "no file chosen..." : fileData.name }}
      </div>
    </div>

    <SetupPreview v-if="fileData != null" :file="fileData" />
  </div>
</template>

<style></style>
