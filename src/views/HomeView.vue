<script setup lang="ts">
import HomeTile from "@/components/HomeTile.vue";
import { homeTiles } from "@/data/homeTiles";
</script>

<template>
  <div class="bg-neutral-800 rounded-md p-4">
    <h1 class="font-bold text-3xl mb-2">RBR Tools</h1>

    <p>
      This site contains various addons designed for Richard Burns Rally
      simulator users.
    </p>

    <h1 class="font-bold my-2">Available functions:</h1>

    <div class="flex flex-col gap-2">
      <HomeTile
        v-for="tile in homeTiles"
        :key="tile.tileTitle"
        :tile-data="tile" />
    </div>
  </div>
</template>
