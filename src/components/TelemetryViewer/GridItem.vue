<script setup>
import BarChart from './BarChart.vue';
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isEditing: Boolean,
});

const emit = defineEmits(["delete"]);
function deleteThisWidget() {
  emit("delete", props.data);
}
</script>

<template>
  <div :id="data.id" :key="data.id" :gs-id="data.id" :gs-x="data.grid.x" :gs-y="data.grid.y" :gs-w="data.grid.w"
    :gs-h="data.grid.h">
    <div class="bg-neutral-700 grid-stack-item-content">
      <div class="grid grid-cols-2 bg-neutral-900 px-2 py-1 no-drag">
        <div>
          <p>{{ data.title }}</p>
        </div>

        <div class="justify-self-end">
          <button @click="deleteThisWidget">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
      <div>
        AAA <!-- <BarChart/> -->
      </div>
    </div>
  </div>
</template>
