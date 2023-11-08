<template>
  <div class="flex gap-2.5 items-center justify-between mt-5">
    <BgPicker :selected-color="data.bgColor" @update:selected-color="(v) => $emit('update:selectedColor', v)" />
    <div class="flex gap-2.5 items-center">
      <button @click="$emit('cancel')" class="text-gray-700 hover:text-gray-700/50 outline-none">Cancel</button>
      <button @click="$emit('save')" class="border text-gray-700 border-gray-700 hover:text-gray-700/50 hover:border-gray-700/50 transition-colors px-3 py-2 rounded-md outline-none">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BgPicker from './BgPicker.vue';
import type { NoteData } from '@/types/note.type';

defineProps<{ data: NoteData }>();
defineEmits(['save', 'cancel', 'update:selectedColor']);
</script>