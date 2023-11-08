<template>
  <div class="relative">
    <span v-if="!modelValue" class="absolute inset-0 z-10">{{ placeholder }}</span>
    <contenteditable
      ref="input"
      tag="div"
      contenteditable
      v-model="modelValue"
      no-html
      :no-nl="noNl"
      @input="$emit('update:value', modelValue)"
      @returned="$emit('returned')"
      class="relative z-20 outline-none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import contenteditable from 'vue-contenteditable';

const input = ref(null);

const props = defineProps<{ value: string, placeholder: string, noNl?: boolean }>();
const modelValue = ref(props.value);
defineEmits(['update:value', 'returned']);
defineExpose({ input });
</script>