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
    
    <router-link to="/replacer" class="py-2 px-3 hover:bg-neutral-700 inline-block">Setup replacer</router-link>
    
  </div>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';

#app {
  padding: 2rem;
  @apply mx-auto md:max-w-5xl
}

.router-link-active{
  color: white;
  @apply bg-neutral-700
}

/* 
@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
