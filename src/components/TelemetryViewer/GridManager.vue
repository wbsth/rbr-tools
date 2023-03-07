<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import type { Ref } from "vue";

import {
  GridStack,
  type GridStackElement,
  type GridStackWidget,
} from "gridstack";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import GridItem from "./GridItem.vue";

// widgets grid
const grid = ref<GridStack>();

const widgets: Ref<GridStackWidget[]> = ref([
  {
    id: 1,
    w: 1,
    h: 4,
  },
]);
const gridItems = ref([]);

function initGridStack() {
  grid.value = GridStack.init({
    column: 1,
    cellHeight: 100,
    minRow: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    disableOneColumnMode: true,
    draggable: {
      handle: ".drag-target",
    },
  });

  if (widgets.value != undefined) {
    makeWidgets(widgets.value);
  }
}

function makeWidgets(widgets: GridStackWidget[]) {
  widgets.forEach((widget) => {
    makeWidget(widget);
  });
}

function makeWidget(item: GridStackWidget) {
  const elementSelector = `#${item.id}`;
  return grid.value?.makeWidget(elementSelector);
}

function deleteWidget(widget: GridStackWidget) {
  const index = widgets.value.findIndex((w) => w.id === widget.id);
  if (index === -1) {
    return;
  }
  const selector = `#${CSS.escape(widget.id?.toString() ?? "")}`;
  grid.value?.removeWidget(selector);
  widgets.value.splice(index, 1);
  grid.value?.compact();
}

async function addWidget() {
  const ids = widgets.value.map((x) => x.id);
  const idsFiltered = ids.filter(
    (x) => x != undefined && parseInt(x.toString())
  ) as number[];
  const newId = ids.length > 0 ? Math.max(...idsFiltered) + 1 : 0;

  const widget = {
    id: newId,
    grid: {
      w: 1,
      h: 4,
    },
  };
  widgets.value.push(widget);
  await nextTick();
  makeWidget(widget);
}

onMounted(() => {
  initGridStack();
});
</script>

<template>
  <div class="grid-stack">
    <GridItem
      v-for="widget in widgets"
      ref="gridItems"
      :key="widget.id"
      :data="widget"
      @delete="deleteWidget" />
  </div>

  <button
    class="bg-neutral-700 px-4 py-2 mb-2 rounded-md cursor-pointer hover:bg-neutral-600 inline-block"
    @click="addWidget">
    <p>Add graph</p>
  </button>
</template>
