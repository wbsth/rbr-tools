<script setup lang="ts">
import type { ITile } from "@/data/homeTiles";

const props = defineProps<{
  tileData: ITile;
}>();

function getImageUrl() {
  return new URL(
    `../assets/img/${props.tileData.tileImagePath}`,
    import.meta.url
  ).toString();
}
</script>

<template>
  <div
    class="flex flex-col sm:flex-row bg-neutral-700 rounded-md overflow-hidden border-2 border-neutral-900">
    <div class="basis-2/3 p-4">
      <a :href="props.tileData.tileUrlPath">
        <h1 class="font-bold text-lg mb-2 hover:text-neutral-400">
          {{ props.tileData.tileTitle }}
        </h1>
      </a>

      <p class="text-justify mx-2">
        {{ props.tileData.tileDescription }}
      </p>
    </div>
    <div class="basis-1/3">
      <a :href="props.tileData.tileUrlPath">
        <img class="object-cover w-full h-full" :src="getImageUrl()" />
      </a>
    </div>
  </div>
</template>
