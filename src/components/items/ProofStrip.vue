<template>
  <div class="w-full flex items-center justify-center">
    <ul class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      <li
        v-for="(item, idx) in items"
        :key="idx"
        class="px-3 py-1 rounded-full border border-neutral-200 text-neutral-700 text-xs sm:text-sm tracking-tight bg-white/60"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>