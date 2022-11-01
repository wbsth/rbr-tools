<script setup>
import { reactive, watch } from "vue";
import SetupReplacer from "../components/SetupReplacer.vue";

const fileData = reactive({ setupFile: null, replayFile: null });

function setupFileWasChanged(event) {
  fileData.setupFile = event.srcElement.files[0];
}

function replayFileWasChanged(event) {
  fileData.replayFile = event.srcElement.files[0];
}

// watch(() => fileData.setupFile, async () => await handleSetupReplacement());
// watch(() => fileData.replayFile, async () => await handleSetupReplacement());

// async function handleSetupReplacement(){
//     if(fileData.replayFile != null && fileData.setupFile != null){
//         console.log("testy");
//     }
// }
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
      <div>
        <input
          id="replayFileUpload"
          type="file"
          style="display: none"
          @change="replayFileWasChanged"
        />
        <label
          for="replayFileUpload"
          class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600 inline-block w-40 text-center"
          >Choose replay file</label
        >
      </div>

      <div class="flex justify-center items-center italic">
        {{
          fileData.replayFile == null
            ? "no file chosen..."
            : fileData.replayFile.name
        }}
      </div>
    </div>

    <div class="flex flex-row content-center gap-3 pb-3">
      <div>
        <input
          id="setupFileUpload"
          type="file"
          style="display: none"
          @change="setupFileWasChanged"
        />
        <label
          for="setupFileUpload"
          class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600 inline-block w-40 text-center"
          >Choose setup file</label
        >
      </div>

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
      :replay-file="fileData.replayFile"
    />
  </div>
</template>
