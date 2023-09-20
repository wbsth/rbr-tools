<script setup lang="ts">
import { ref } from "vue";
import DataManager from "../components/TelemetryViewer/DataManager.vue";
import GridManager from "../components/TelemetryViewer/GridManager.vue";
import TelemetrySettingsBar from "../components/TelemetryViewer/TelemetrySettingsBar.vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { TelemetryTips } from "@/data/descriptions";

function helpClicked() {
  const element = document.getElementById("helpModal");
  if (element != null && element instanceof HTMLDialogElement) {
    element.showModal();
  }
}
</script>

<template>
  <div class="rounded-md p-8">
    <div class="flex flex-row items-center mb-2 prose">
      <h1 class="my-auto">Telemetry analyzer</h1>
      <div class="btn btn-neutral btn-sm btn-square ml-4" @click="helpClicked">
        <font-awesome-icon
          class="h-4 w-4 text-gray-400"
          icon="fa-solid fa-question"
          aria-hidden="true" />
      </div>
    </div>

    <DataManager />

    <div className="divider my-2" />

    <TelemetrySettingsBar />

    <GridManager />

    <dialog id="helpModal" className="modal">
      <div className="modal-box prose absolute">
        <h3 className="font-bold">Help</h3>
        <div v-for="tip in TelemetryTips" :key="tip.title" class="mt-2">
          <p class="text-base text-left font-semibold">
            {{ tip.title }}
          </p>
          <p class="text-sm">
            {{ tip.description }}
          </p>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
