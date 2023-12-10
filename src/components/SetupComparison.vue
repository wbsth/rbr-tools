<script setup lang="ts">

import {type FileWithHandle} from "browser-fs-access";
import {ref} from "vue";

const props = defineProps<{
  setupFile: FileWithHandle;
  setupFileForComparison: FileWithHandle;
}>();

async function compare() {


  // set1.value = await props.setupFile.text();
  // 1. read text from setup file
  // 2. search for paremeters values
  // 3. whitelised parameters and search by list ?
  // 4. wrap values in type
}

</script>

<template>
  <div className="divider my-2"/>
  <div>
    <div class="prose">
      <button :class="['btn', 'btn-primary']" @click="compare">Compare</button>
    </div>
    <!--  here goes comparison between two setups-->
  </div>
</template>