<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { inject } from "@vercel/analytics";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Setup extractor", href: "/extractor" },
  { name: "Setup replacer", href: "/replacer" },
  { name: "Telemetry analyzer", href: "/telemetry" },
];

inject();
</script>

<template>
  <!-- <div>
    <span class="text-red-600 font-bold text-2xl">RBR </span>
    <span class="text-white font-bold text-2xl">TOOLS</span>
  </div> -->

  <!-- <div class="my-2 bg-neutral-800 rounded-md">
    <router-link
      to="/"
      class="ml-2 py-2 px-3 hover:bg-neutral-700 inline-block">
      Home
    </router-link>
    <router-link
      to="/extractor"
      class="ml-2 py-2 px-3 hover:bg-neutral-700 inline-block">
      Setup extractor
    </router-link>

    <router-link
      to="/replacer"
      class="py-2 px-3 hover:bg-neutral-700 inline-block">
      Setup replacer
    </router-link>

    <router-link
      to="/telemetry"
      class="py-2 px-3 hover:bg-neutral-700 inline-block">
      Telemetry analyzer
    </router-link>

    <p class="py-2 px-3 inline-block">more soon...</p>
  </div> -->

  <Disclosure v-slot="{ open }" as="nav" class="bg-neutral-800 rounded-md my-2">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex flex-row h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden z-10">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-stone-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <font-awesome-icon
              v-if="!open"
              class="block h-4 w-4"
              icon="fa-solid fa-bars"
              aria-hidden="true" />

            <font-awesome-icon
              v-else
              class="block h-4 w-4"
              icon="fa-solid fa-xmark"
              aria-hidden="true" />
          </DisclosureButton>
        </div>

        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start z-0">
          <div class="flex flex-shrink-0 items-center">
            <span class="text-red-600 font-bold text-2xl mr-1">RBR</span>
            <span class="text-white font-bold text-2xl">TOOLS</span>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <!-- <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              > -->
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-stone-600 hover:text-white">
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel v-slot="{ close }" class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          class="block rounded-md px-3 py-2 text-base font-medium">
          <button @click="close">
            <router-link
              :key="item.name"
              :to="item.href"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-stone-600 hover:text-white">
              {{ item.name }}
            </router-link>
          </button>
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>

  <RouterView v-slot="{ Component }">
    <Transition mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <p class="text-center text-xs mt-1 font-mono">Michal Ungeheuer 2023</p>
</template>

<style>
@import "@/assets/base.css";

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

#app {
  padding: 2rem;
  @apply mx-auto md:max-w-5xl;
}

.router-link-active {
  @apply text-gray-100;
  @apply bg-stone-700;
}
</style>
