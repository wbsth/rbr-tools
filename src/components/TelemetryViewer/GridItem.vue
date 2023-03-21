<script setup lang="ts">
import { ref, watch } from "vue";
import ScatterChart from "./ScatterChart.vue";

import { availableCharts } from "../../data/chartTypes";
import type { IAvailableChart } from "../../data/chartTypes";

import { telemetryFileStore } from "../../stores/telemetryFileStore";

import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["delete"]);
const store = telemetryFileStore();

function deleteThisWidget() {
  emit("delete", props.data);
}

const selectedChartType = ref<IAvailableChart>();

watch(selectedChartType, () => {
  if (selectedChartType.value) {
    store.prepareChartData({
      chartId: props.data.id,
      ySettings: selectedChartType.value,
    });
  }
});
</script>

<template>
  <div
    :id="data.id"
    :key="data.id"
    :gs-id="data.id"
    :gs-x="data.x"
    :gs-y="data.y"
    :gs-w="data.w"
    :gs-h="data.h">
    <div class="bg-neutral-700 grid-stack-item-content flex flex-col">
      <div
        class="grid grid-cols-2 bg-neutral-900 px-2 py-1 no-drag drag-target">
        <div>
          <Listbox v-model="selectedChartType" as="div">
            <div>
              <ListboxButton
                class="h-8 border text-sm rounded-sm block w-64 p-1 bg-neutral-800 border-gray-900 placeholder-gray-400 text-white focus:border-neutral-600 focus:ring-neutral-600 sm:text-sm sm:leading-6">
                <span class="flex items-center">
                  <span class="ml-3 block truncate">{{
                    selectedChartType?.label
                  }}</span>
                </span>
                <span
                  class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <font-awesome-icon
                    class="h-3 w-3 text-gray-400"
                    icon="fa-solid fa-bars"
                    aria-hidden="true" />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                  class="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-neutral-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <ListboxOption
                    v-for="chart in availableCharts"
                    :key="chart.label"
                    v-slot="{ active, selected }"
                    as="template"
                    :value="chart">
                    <li
                      :class="[
                        active ? 'bg-stone-700 text-white' : 'text-gray-200',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      ]">
                      <div class="flex items-center">
                        <span
                          :class="[
                            selected ? 'font-bold' : 'font-normal',
                            'ml-3 block truncate',
                          ]"
                          >{{ chart.label }}</span
                        >
                      </div>

                      <span
                        v-if="selected"
                        :class="[
                          active ? 'text-white' : 'text-indigo-600',
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                        ]">
                        <font-awesome-icon
                          class="h-3 w-3 text-gray-400"
                          icon="fa-solid fa-check"
                          aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>

        <div class="justify-self-end my-auto">
          <button @click="deleteThisWidget">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
      <div class="grow flex justify-center items-center overflow-hidden">
        <p v-if="!store.chartMaterials.get(props.data.id)" class="italic">
          no data
        </p>
        <ScatterChart
          v-else
          :chart-data="store.chartMaterials.get(data.id)?.chartData ?? {}"
          :files-settings="store.filesSettings"
          :x-unit="store.chartMaterials.get(data.id)?.xUnit"
          :y-unit="store.chartMaterials.get(data.id)?.yUnit"
          :x-label="store.chartMaterials.get(data.id)?.xLabel"
          :y-label="store.chartMaterials.get(data.id)?.yLabel" />
      </div>
    </div>
  </div>
</template>
<style>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  @apply bg-stone-300;
}

/* Handle */
::-webkit-scrollbar-thumb {
  @apply bg-stone-500;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  @apply bg-stone-600;
}
</style>
