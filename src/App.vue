<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <span class="text-red-600 font-bold text-2xl">RBR </span>
    <span class="text-white font-bold text-2xl">TOOLS</span>
  </div>
  
  <div class="my-2 bg-neutral-800 rounded-md">
    <router-link to="/" class="ml-2 py-2 px-3 hover:bg-neutral-700 inline-block">Setup extractor</router-link>
    <p class="py-2 px-3 inline-block">more soon...</p>
    <!-- <router-link to="/replacer" class="py-2 px-3 hover:bg-neutral-700 inline-block">Setup replacer</router-link> -->
    
  </div>
  
  <RouterView v-slot="{ Component }">
    <Transition mode="out-in">
      <component :is="Component"/>
    </Transition>
  </RouterView>
  
</template>

<style>
@import '@/assets/base.css';

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
  @apply mx-auto md:max-w-5xl
}

.router-link-active{
  color: white;
  @apply bg-neutral-700
}

</style>
