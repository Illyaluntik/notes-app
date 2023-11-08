<template>
  <Popover class="z-30">
    <PopoverButton class="h-8 w-8 p-1 text-gray-700 hover:text-gray-700/50 border border-gray-700 rounded-md transition-colors hover:border-gray-700/50 outline-none" title="Change Background">
      <PaintBrushIcon />
    </PopoverButton>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel class="absolute z-10 transform px-4 sm:px-0 lg:max-w-3xl bottom-14 left-1/2 -translate-x-1/2 max-w-[calc(100%-40px)]">
        <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 bg-white flex flex-wrap gap-2.5 items-center p-2.5" @click.stop="() => {}">
          <div
            v-for="color of colors"
            :key="color"
            :style="{ backgroundColor: color }"
            :class="{ 'ring-black/80': color === selectedColor }"
            class="w-6 h-6 rounded-full shadow ring-2 ring-black/5 hover:ring-black/40 cursor-pointer transition-all"
            @click.stop="$emit('update:selectedColor', color)"
          />
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup lang="ts">
import { PaintBrushIcon } from '@heroicons/vue/24/outline';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { colors } from '@/misc/colors';

defineProps<{ selectedColor: string }>();
defineEmits(['update:selectedColor']);
</script>
