<script setup>
import { reactive, computed } from "vue";
import { replaceSetup } from "../tools/replacer.mjs";
import { saveAs } from "file-saver";

const props = defineProps({
  replayFile: File,
  setupFile: File,
});

const extractResult = reactive({});
const canShowDownloadButton = computed(() => {
  return extractResult.message != null ? !extractResult.failed : false;
});

async function replace() {
  replaceSetup(props.replayFile, props.setupFile);
}
</script>

<template>
  <hr class="border-neutral-600" />
  <div>
    <h1 class="font-bold text-lg">New replay file</h1>
    <!-- <p class="mb-2">{{extractResult.message == null? '': extractResult.message}}</p> -->
    <div>
      <button
        class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600"
        @click="replace"
      >
        Replace
      </button>
    </div>
  </div>
</template>
