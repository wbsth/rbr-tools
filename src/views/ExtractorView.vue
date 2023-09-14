<script setup lang="ts">
import { ref } from "vue";
import { fileOpen, type FileWithHandle } from "browser-fs-access";
import SetupPreview from "../components/SetupPreview.vue";

const fileData = ref<FileWithHandle>();

async function LoadNewReplayFile(fileEvent: Event) {
  console.log(fileEvent.data);

  const file = await fileOpen({
    description: "RBR Replay File",
    extensions: [".rpl"],
  });
  fileData.value = file;
}
</script>

<template>
  <div class="bg-base-300 rounded-md p-8">
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
      <input
        type="file"
        className="file-input w-full max-w-xs"
        @change="LoadNewReplayFile" />
      <!-- <button
        class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600 inline-block"
        @click="LoadNewReplayFile">
        <p>Choose replay file</p>
      </button> -->

      <!-- <div class="flex justify-center items-center italic">
        {{ fileData == null ? "no file chosen..." : fileData.name }}
      </div> -->
    </div>

    <SetupPreview v-if="fileData != null" :file="fileData" />
  </div>
</template>

<style></style>
