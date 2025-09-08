<script setup>
import Header from './components/items/Header.vue'
import LoadingBars from './components/transitions/LoadingBars.vue'
</script>

<template>
  <Header />
  <RouterView />
  <LoadingBars />
</template>