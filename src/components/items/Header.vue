<script setup>
import { RouterLink } from 'vue-router';
import Brandlogo from '../../assets/logos/brandlogo.vue';
</script>

<template>
    <header class="fixed top-0 w-full z-50 hidden">
      <div class="w-full h-fit p-3">
        <div class="w-full h-full">
            <div class="w-full h-full p-2 flex items-center justify-center">
                <div class="w-3/4 h-full bg-none shadow-xl bg-black/50 backdrop-blur-sm p-3 flex items-center justify-evenly rounded-xl">
                    <RouterLink to="/" class="w-fit h-full flex items-center justify-center">
                        <div class="w-10 h-10">
                            <Brandlogo bg-color="none" accent-color="#ffff"/>
                        </div>
                        <h1 class="text-sm font-bold text-white ml-2">Name</h1>
                    </RouterLink>
                    <div class="w-3/4 h-full flex items-center justify-center font-figtree">
                        <h1 class="text-2xl font-bold text-white">My Application</h1>
                    </div>
                    <div class="w-fit h-full flex items-center justify-center">
                        <h1 class="text-sm font-bold text-white">Version 1.0.0</h1>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </header>
  </template>