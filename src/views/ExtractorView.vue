<script setup lang="ts">
import { ref } from "vue";
import { fileOpen, type FileWithHandle } from "browser-fs-access";
import SetupPreview from "../components/SetupPreview.vue";

const fileData = ref<FileWithHandle>();

async function LoadNewReplayFile(fileEvent: Event) {
  console.log(fileEvent);

  const file = await fileOpen({
    description: "RBR Replay File",
    extensions: [".rpl"],
  });
  fileData.value = file;
}
</script>

<template>
  <div class="rounded-md p-8">
    <div class="prose">
      <h1>Setup extractor</h1>
      <p>
        This simple tool allows you to extract setup file from Richard Burns
        Rally replay file (.rpl).
      </p>
      <p>
        All files are processed on the client side - no files are being sent to
        the server.
      </p>
    </div>

    <div class="flex flex-row content-center py-3 gap-3">
      <!-- <input
        type="file"
        className="file-input w-full max-w-xs"
        @change="LoadNewReplayFile" /> -->
      <button class="btn btn-neutral" @click="LoadNewReplayFile">
        Choose replay file
      </button>

      <div class="flex justify-center items-center italic">
        {{ fileData == null ? "no file chosen..." : fileData.name }}
      </div>
    </div>

    <SetupPreview v-if="fileData != null" :file="fileData" />
  </div>
</template>

<style></style>
