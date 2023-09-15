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
  <div class="rounded-md p-8">
    <div class="prose">
      <!-- <h1>Setup extractor</h1>
      <p>
        This simple tool allows you to extract setup file from Richard Burns
        Rally replay file (.rpl).
      </p>
      <p>
        All files are processed on the client side - no files are being sent to
        the server.
      </p> -->
      <h1>Setup replacer</h1>
      <p>
        This tool allows you to hide car setup in your replay file - by
        replacing with other setup
      </p>
      <p>
        All files are processed on the client side - no files are being sent to
        the server.
      </p>
      <p class="italic text-sm">
        Warning: use only setups saved used ingame editor.
      </p>
    </div>

    <div class="flex flex-row content-center gap-3 py-3">
      <button class="btn btn-neutral w-44" @click="loadReplayFile">
        Choose replay file
      </button>

      <div class="flex justify-center items-center italic">
        {{ replayFile == null ? "no file chosen..." : replayFile.name }}
      </div>
    </div>

    <div class="flex flex-row content-center gap-3 pb-3">
      <button class="btn btn-neutral w-44" @click="loadSetupFile">
        Choose setup file
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
