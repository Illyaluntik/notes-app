<template>
  <button class="h-8 w-8 p-1 text-gray-700 hover:text-green-500 border border-gray-700 rounded-md transition-colors hover:border-green-500 outline-none" title="Duplicate Note">
    <DocumentDuplicateIcon />
  </button>
</template>

<script setup lang="ts">
import { DocumentDuplicateIcon } from '@heroicons/vue/24/outline';
</script>