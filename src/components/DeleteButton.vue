<template>
  <button class="h-8 w-8 p-1 text-gray-700 hover:text-red-500 border border-gray-700 rounded-md transition-colors hover:border-red-500 outline-none" title="Delete Note">
    <TrashIcon />
  </button>
</template>

<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline';
</script>