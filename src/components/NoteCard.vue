<template>
  <div
    :id="data.id"
    :gs-id="data.id"
    :gs-x="data.grid.x"
    :gs-y="data.grid.y"
    :gs-w="data.grid.w"
    :gs-h="data.grid.h"
  >
    <div
      class="grid-stack-item-content p-4 rounded-md shadow-md flex flex-col gap-2.5 cursor-move !overflow-y-hidden relative group transition-colors"
      :class="{ 'items-center justify-center': !data.title && !data.content }"
      @click="$emit('edit')"
      :style="{ backgroundColor: data.bgColor }"
    >
      <div v-if="!data.title && !data.content" class="flex items-center gap-2">
        <span class="text-lg">Empty note</span>
        <PencilSquareIcon class="w-5 h-5" />
      </div>

      <span v-if="data.title" class="text-lg font-semibold text-opacity-80 line-clamp-1 flex-shrink-0">{{ data.title }}</span>
      <contenteditable tag="div" :contenteditable="false" :modelValue="data.content" :no-html="true" class="overflow-hidden" />

      <div class="absolute h-8 inset-x-0 bottom-4 z-10" :style="{ backgroundImage: `linear-gradient(to top, ${data.bgColor}, ${data.bgColor}, transparent)` }" />
      <NoteFooter
        :data="data"
        class="absolute inset-x-0 bottom-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity z-20"
        :style="{ backgroundColor: data.bgColor }"
        @delete="$emit('delete', data.id)"
        @duplicate="$emit('duplicate', data.id)"
        @update:selected-color="(v) => $emit('update:selectedColor', v)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NoteFooter from './NoteFooter.vue';
import contenteditable from 'vue-contenteditable';
import { PencilSquareIcon } from '@heroicons/vue/24/outline';
import type { NoteData } from '@/types/note.type';

defineProps<{ data: NoteData }>();
defineEmits(['edit', 'delete', 'duplicate', 'update:selectedColor']);
</script>
