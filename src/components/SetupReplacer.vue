<script setup lang="ts">
import { ref } from "vue";
import { replaceSetup } from "@/tools/replacer";
import { fileSave, type FileWithHandle } from "browser-fs-access";
import type { FileOperationResult } from "@/tools/misc";

const props = defineProps<{
  replayFile: FileWithHandle;
  setupFile: FileWithHandle;
}>();

const replaceResult = ref<FileOperationResult>();

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

  if (replaceResult.value != undefined) {
    var blob = new Blob([replaceResult.value.data], { type: "example/binary" });

    await fileSave(blob, {
      fileName: fileName + "_copy",
      extensions: [".rpl"],
      description: "RBR Replay File",
    });
  }
}
</script>

<template>
  <div className="divider my-2" />
  <div>
    <div class="prose">
      <h3>New replay file</h3>
    </div>

    <div v-if="replaceResult?.failed == null">
      <button class="btn btn-neutral" @click="replace">Replace</button>
    </div>

    <div v-else>
      <div v-if="replaceResult?.failed">
        <p>Replacement failed - {{ replaceResult.message }}</p>
      </div>

      <div v-else class="flex flex-row items-center gap-2">
        <div class="prose">
          <p class="prose">Replacement success!</p>
        </div>
        <button class="btn btn-neutral" @click="saveToDisk">Save</button>
      </div>
    </div>
  </div>
</template>
