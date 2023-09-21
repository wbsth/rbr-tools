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
let grid: GridStack;
const widgetCount = ref(0);

const widgets: Ref<GridStackWidget[]> = ref([
  {
    id: 0,
    w: 1,
    h: 4,
    x: 0,
    y: 0,
  },
]);
const gridItems = ref([]);

function initGridStack() {
  grid = GridStack.init({
    column: 1,
    cellHeight: 100,
    minRow: 1,
    margin: "5px 5px 5px 5px",
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
  return grid.makeWidget(elementSelector);
}

function deleteWidget(widget: GridStackWidget) {
  const index = widgets.value.findIndex((w) => w.id === widget.id);
  if (index === -1) {
    return;
  }
  const selector = `#${CSS.escape(widget.id?.toString() ?? "")}`;
  grid.removeWidget(selector);
  widgets.value.splice(index, 1);
  grid.compact();
}

async function addWidget() {
  widgetCount.value += 1;
  const ids = widgets.value.map((x) => x.id);
  const idsFiltered = ids.filter(
    (x) => x != undefined && parseInt(x.toString())
  ) as number[];

  const newId = ids.length > 0 ? Math.max(...idsFiltered) + 1 : 0;

  const widget: GridStackWidget = {
    id: widgetCount.value,
    w: 1,
    h: 4,
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

  <button class="btn btn-neutral btn-sm" @click="addWidget">Add graph</button>
</template>
