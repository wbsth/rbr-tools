<script setup lang="ts">
import { ref } from "vue";
import { replaceSetup } from "@/tools/replacer";
import { fileSave, type FileWithHandle } from "browser-fs-access";

const props = defineProps<{
  replayFile: FileWithHandle;
  setupFile: FileWithHandle;
}>();

const replaceResult = ref();

async function replace() {
  const res = await replaceSetup(props.replayFile, props.setupFile);
  replaceResult.value = res;
}

async function saveToDisk() {
  const fileName =
    props.replayFile.name.substring(
      0,
      props.replayFile.name.lastIndexOf(".")
    ) || props.replayFile.name;
  var blob = new Blob([replaceResult.value.data], { type: "example/binary" });

  await fileSave(blob, {
    fileName: fileName + "_copy",
    extensions: [".rpl"],
    description: "RBR Replay File",
  });
}
</script>

<template>
  <hr class="border-neutral-600" />
  <div>
    <h1 class="font-bold text-lg">New replay file</h1>

    <div v-if="replaceResult.failed == null">
      <button
        class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600"
        @click="replace">
        Replace
      </button>
    </div>

    <div v-else>
      <div v-if="replaceResult.failed">
        <p>Replacement failed - {{ replaceResult.message }}</p>
      </div>

      <div v-else class="flex flex-row items-center gap-2">
        <p>Replacement success!</p>
        <button
          class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600"
          @click="saveToDisk">
          Save
        </button>
      </div>
    </div>
  </div>
</template>
