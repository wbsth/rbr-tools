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
    <!-- <TransitionRoot as="template" :show="helpOpen">
      <Dialog as="div" class="relative z-10" @close="helpOpen = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0">
          <div
            class="fixed inset-0 bg-neutral-900 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-stone-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-left sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        class="text-lg font-bold leading-6 text-center"
                        >Tips</DialogTitle
                      >
                      <div
                        v-for="tip in TelemetryTips"
                        :key="tip.title"
                        class="mt-2">
                        <p class="text-base text-left font-semibold">
                          {{ tip.title }}
                        </p>
                        <p class="text-sm">
                          {{ tip.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center px-3 py-2 text-sm font-semibold bg-neutral-700 rounded-md cursor-pointer sm:mt-0 sm:w-auto"
                    @click="helpOpen = false"
                    ref="cancelButtonRef">
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot> -->
  </div>
</template>
