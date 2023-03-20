<script setup lang="ts">
import { ref } from "vue";
import SetupReplacer from "../components/SetupReplacer.vue";
import { fileOpen, type FileWithHandle } from "browser-fs-access";

const setupFile = ref<FileWithHandle>();
const replayFile = ref<FileWithHandle>();

async function loadSetupFile() {
  const file = await fileOpen({
    description: "RBR Setup File",
    extensions: [".lsp"],
  });
  setupFile.value = file;
}

async function loadReplayFile() {
  const file = await fileOpen({
    description: "RBR Replay File",
    extensions: [".rpl"],
  });
  replayFile.value = file;
}
</script>

<template>
  <div class="bg-neutral-800 rounded-md p-4">
    <h1 class="font-bold text-3xl">Setup replacer</h1>
    <p class="text-sm italic">
      This tool allows you to hide car setup in your replay file - by replacing
      with other setup
    </p>
    <p class="text-sm italic">
      All files are processed on the client side - no files are being sent to
      the server.
    </p>
    <p class="text-sm italic font-bold">
      Warning: use only setups saved used ingame editor.
    </p>

    <div class="flex flex-row content-center gap-3 py-3">
      <button
        class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600 inline-block w-40 text-center"
        @click="loadReplayFile">
        <p>Choose replay file</p>
      </button>

      <div class="flex justify-center items-center italic">
        {{ replayFile == null ? "no file chosen..." : replayFile.name }}
      </div>
    </div>

    <div class="flex flex-row content-center gap-3 pb-3">
      <button
        class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600 inline-block w-40 text-center"
        @click="loadSetupFile">
        <p>Choose setup file</p>
      </button>

      <div class="flex justify-center items-center italic">
        {{ setupFile == null ? "no file chosen..." : setupFile.name }}
      </div>
    </div>

    <SetupReplacer
      v-if="setupFile != null && replayFile != null"
      :setup-file="setupFile"
      :replay-file="replayFile" />
  </div>
</template>
