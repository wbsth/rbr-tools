<script setup>
import { reactive } from "vue";
import SetupReplacer from "../components/SetupReplacer.vue";
import { fileOpen } from "browser-fs-access";

const fileData = reactive({ setupFile: null, replayFile: null });

async function loadSetupFile() {
  const file = await fileOpen({
    description: "RBR Setup File",
    extensions: [".lsp"],
  });
  fileData.setupFile = file;
}

async function loadReplayFile() {
  const file = await fileOpen({
    description: "RBR Replay File",
    extensions: [".rpl"],
  });
  fileData.replayFile = file;
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

    <div class="flex flex-row content-center gap-3 py-3">
      <button
        class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600 inline-block w-40 text-center"
        @click="loadReplayFile">
        <p>Choose replay file</p>
      </button>

      <div class="flex justify-center items-center italic">
        {{
          fileData.replayFile == null
            ? "no file chosen..."
            : fileData.replayFile.name
        }}
      </div>
    </div>

    <div class="flex flex-row content-center gap-3 pb-3">
      <button
        class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600 inline-block w-40 text-center"
        @click="loadSetupFile">
        <p>Choose setup file</p>
      </button>

      <div class="flex justify-center items-center italic">
        {{
          fileData.setupFile == null
            ? "no file chosen..."
            : fileData.setupFile.name
        }}
      </div>
    </div>

    <SetupReplacer
      v-if="fileData.setupFile != null && fileData.replayFile != null"
      :setup-file="fileData.setupFile"
      :replay-file="fileData.replayFile" />
  </div>
</template>
