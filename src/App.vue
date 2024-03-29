<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { appSettingsStore } from "./stores/appSettingsStore";

import { inject } from "@vercel/analytics";

const navigation = [
  { name: "Setup extractor", href: "/extractor" },
  { name: "Setup replacer", href: "/replacer" },
  { name: "Telemetry analyzer", href: "/telemetry" },
];

const settingsStore = appSettingsStore();

inject();
</script>

<template>
  <div
    class="mx-auto p-8 bg-base-300"
    :class="{ 'md:max-w-6xl': !settingsStore.wideViewEnabled }">
    <div className="navbar bg-base-200 rounded-md mb-2">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="{0}" className="btn btn-ghost lg:hidden">
            <font-awesome-icon
              class="block h-4 w-4"
              icon="fa-solid fa-bars"
              aria-hidden="true" />
          </label>
          <ul
            tabIndex="{0}"
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li v-for="item in navigation" :key="item.name">
              <router-link :key="item.name" :to="item.href">
                <a>{{ item.name }}</a>
              </router-link>
            </li>
          </ul>
        </div>
        <router-link :key="navigation[0].name" to="/">
          <a className="btn btn-ghost">
            <div>
              <span class="text-red-600 font-bold text-2xl mr-1">RBR</span>
              <span class="text-white font-bold text-2xl">TOOLS</span>
            </div>
          </a>
        </router-link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <!-- <DisclosureButton
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
          </DisclosureButton> -->
          <li v-for="item in navigation" :key="item.name">
            <router-link :key="item.name" :to="item.href">
              <a>{{ item.name }}</a>
            </router-link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <!-- <a className="btn">Button</a> -->
      </div>
    </div>

    <!-- <Disclosure v-slot="{ open }" as="nav" class="bg-base-300 rounded-md my-2">
      <div class="max-w-7xl px-2 sm:px-6 lg:px-8 py-2">
        <div class="relative flex flex-row h-16 items-center justify-between">
          <div
            class="absolute inset-y-0 left-0 flex items-center sm:hidden z-10">
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
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href">
                  <button className="btn">{{ item.name }}</button>
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
    </Disclosure> -->

    <RouterView v-slot="{ Component }" class="bg-base-200">
      <Transition mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <footer
      className="footer footer-center p-4 bg-base-300 text-base-content text-xs rounded-md my-2">
      <aside>
        <p>Michal Ungeheuer 2023 | wb#1287</p>
      </aside>
    </footer>
    <!-- <p class="text-center text-xs mt-1 font-mono"></p> -->
  </div>
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

.router-link-active > button {
  @apply btn-primary;
}
</style>
