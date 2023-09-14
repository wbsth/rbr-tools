<script setup lang="ts">
import HomeTile from "@/components/HomeTile.vue";
import { homeTiles } from "@/data/homeTiles";
</script>

<template>
  <div class="bg-base-300 rounded-md px-8 pb-8 py-4">
    <div class="prose max-w-none mb-4">
      <h2 class="mb-2">About</h2>

      <p>
        This site contains various addons designed for Richard Burns Rally
        simulator users. Currently you can use telemetry analyzer, setup
        extractor, and setup replacer, but more features are about to come.
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <HomeTile
        v-for="tile in homeTiles"
        :key="tile.tileTitle"
        :tile-data="tile" />
    </div>
  </div>
</template>
