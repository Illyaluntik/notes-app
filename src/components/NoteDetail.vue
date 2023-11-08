<template>
  <div class="flex flex-col gap-2.5 p-6 rounded-2xl transition-colors" :style="{ backgroundColor: data.bgColor }">
    <ContenteditableWrapper
      :value="data.title"
      :no-nl="true"
      placeholder="Title"
      class="text-lg font-semibold mr-5"
      @update:value="(v) => $emit('update:title', v)"
      @returned="onPressEnter()"
    />

    <ContenteditableWrapper
      :value="data.content"
      @update:value="(v) => $emit('update:content', v)"
      placeholder="Note"
      ref="contentInput"
    />

    <NoteFooter
      v-if="!isNew"
      :data="data"
      @delete="$emit('delete', data.id)"
      @duplicate="$emit('duplicate', data.id)"
      @update:selected-color="(v) => $emit('update:selectedColor', v)"
      class="mt-5"
    />

    <NewNoteFooter
      v-if="isNew"
      :data="data"
      @cancel="$emit('cancel')"
      @save="$emit('save')"
      @update:selected-color="(v) => $emit('update:selectedColor', v)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ContenteditableWrapper from './ContenteditableWrapper.vue';
import NoteFooter from './NoteFooter.vue';
import NewNoteFooter from './NewNoteFooter.vue';
import type { NoteData } from '@/types/note.type';

const contentInput = ref(null);
const onPressEnter = () => {
  (contentInput.value as any)?.input?.$refs.element.focus();
};

defineProps<{ data: NoteData, isNew: boolean }>();
defineEmits(['delete', 'save', 'cancel', 'duplicate', 'update:title', 'update:content', 'update:selectedColor']);
</script>