<script setup>
import { ref, onMounted, nextTick } from 'vue'

import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import GridItem from './GridItem.vue';

// widgets grid
let grid = null;

function initGridStack() {
  grid = GridStack.init({
    column: 1,
    cellHeight: 100,
    minRow: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
  });
  makeWidgets(widgets.value);
}

function makeWidgets(widgets) {
  widgets.forEach((widget) => {
    makeWidget(widget);
  });
}

function makeWidget(item) {
  const elementSelector = `#${item.id}`;
  return grid.makeWidget(elementSelector);
}

function deleteWidget(widget) {
  const index = widgets.value.findIndex((w) => w.id === widget.id);
  if (index === -1) {
    return;
  }
  const selector = `#${CSS.escape(widget.id)}`;
  grid.removeWidget(selector);
  widgets.value.splice(index, 1);
  grid.compact();
}

async function addWidget(){
    const ids = widgets.value.map(x=>x.id);
    const newId = ids.length > 0 ? Math.max(...ids) + 1 : 0;

    const widget = {
        id: newId,
        title: `Widget ${newId}`,
        grid: {
        w: 1,
        h: 1,
        },
    };
    widgets.value.push(widget);
    await nextTick();
    makeWidget(widget);
}


const widgets = ref([
  {
    id: 1,
    title: "First Widget",
    grid: {
      w: 1,
      h: 2,
    },
  }
]);

onMounted(() => {
  initGridStack();
});

</script>

<template>
    <div class="grid-stack">
      <GridItem
        v-for="widget in widgets"
        :key="widget.id"
        :data="widget"
        @delete="deleteWidget"
      />
    </div>
    
    <button class="bg-neutral-700 px-4 py-2 mb-2 rounded-md cursor-pointer hover:bg-neutral-600 inline-block" @click="addWidget">
        <p>Add graph</p>
    </button>

</template>