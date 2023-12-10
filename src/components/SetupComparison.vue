<script setup lang="ts">

import {type FileWithHandle} from "browser-fs-access";
import {ref} from "vue";
import { TyrePressure } from "@/types/setup/TyrePressure";

const props = defineProps<{
  setupFile: FileWithHandle;
  setupFileForComparison: FileWithHandle;
}>();

const setupFileContent = ref<string>();
const tyrePressure = ref<TyrePressure>();

async function compare() {
  setupFileContent.value = await props.setupFile.text();
  tyrePressure.value = extractTyrePressures(setupFileContent.value);
}

// move to separate file
function extractTyrePressures(text: string) {
  const regex = /Tyre(LF|RF|LB|RB)\s*\(".*?"\s*Pressure\s*(\d+\.\d+)/g;
  let match: RegExpExecArray | null;

  // Initialize with default values
  const tyrePressures: TyrePressure = {
    frontLeft: 0,
    frontRight: 0,
    rearLeft: 0,
    rearRight: 0
  };

  while ((match = regex.exec(text)) !== null) {
    const position = match[1];
    const pressure = parseFloat(match[2]);

    switch (position) {
      case 'LF':
        tyrePressures.frontLeft = pressure;
        break;
      case 'RF':
        tyrePressures.frontRight = pressure;
        break;
      case 'LB':
        tyrePressures.rearLeft = pressure;
        break;
      case 'RB':
        tyrePressures.rearRight = pressure;
        break;
      default:
        break;
    }
  }

  return tyrePressures;
}

</script>

<template>
  <div className="divider my-2"/>
  <div>
    <div class="prose">
      <button :class="['btn', 'btn-primary']" @click="compare">Compare</button>
    </div>
    <!--  here goes comparison between two setups-->
    <div v-if="setupFileContent != null">
      <p>Tyre pressures</p>
      <p>Front Left: {{TyrePressure.pressureInKpa(tyrePressure.frontLeft).toString()}}</p>
      <p>Front Right: {{TyrePressure.pressureInKpa(tyrePressure.frontRight).toString()}}</p>
      <p>Rear Left: {{TyrePressure.pressureInKpa(tyrePressure.rearLeft).toString()}}</p>
      <p>Rear Right: {{TyrePressure.pressureInKpa(tyrePressure.rearRight).toString()}}</p>
    </div>

  </div>
</template>