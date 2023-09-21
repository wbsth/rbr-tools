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
  <div className="card lg:card-side bg-base-100 shadow-md">
    <figure class="basis-1/3">
      <img class="h-full w-full" :src="getImageUrl()" />
    </figure>
    <div className="card-body basis-2/3">
      <div class="prose text-justify max-w-none">
        <h2 className="card-title">{{ props.tileData.tileTitle }}</h2>
        <p>{{ props.tileData.tileDescription }}</p>
      </div>

      <div className="card-actions justify-end">
        <router-link key="test" :to="props.tileData.tileUrlPath">
          <button className="btn">Open</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
