<template>
  <div class="flex gap-5 items-center justify-between">
    <div class="flex gap-2.5 items-center">
      <DeleteButton @click.stop="$emit('delete')" />
      <DuplicateButton @click.stop="$emit('duplicate')" />
      <BgPicker :selected-color="data.bgColor" @update:selected-color="(v) => $emit('update:selectedColor', v)" />
    </div>
    <span class="text-xs">Edited <span class="opacity-50">{{ formatDate(data.editedAt) }}</span></span>
  </div>
</template>

<script setup lang="ts">
import DeleteButton from './DeleteButton.vue';
import DuplicateButton from './DuplicateButton.vue';
import BgPicker from './BgPicker.vue';
import { formatDate } from '@/misc/date';
import type { NoteData } from '@/types/note.type';

defineProps<{ data: NoteData }>();
defineEmits(['delete', 'duplicate', 'update:selectedColor']);
</script>