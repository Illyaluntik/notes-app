<template>
  <div class="px-5 py-5 sm:px-5 sm:py-10 bg-slate-100 min-h-screen relative">
    <div class="flex justify-center items-center self-start gap-2.5 mx-auto mb-10 sticky top-5 z-50">
      <div
        type="text"
        class="p-4 text-lg rounded-md bg-slate-200 shadow-lg max-w-[500px] w-full cursor-text"
        @click="addNote()"
      >
        Take a note...
      </div>

      <button @click="onSeedData()" class="h-8 w-8 p-1 text-gray-700 hover:text-gray-700/50 border border-gray-700 rounded-md transition-colors hover:border-gray-700/50 outline-none bg-slate-100" title="Fill with demo data shadow-lg">
        <Cog6ToothIcon />
      </button>
      <button @click="onClearLS()" class="h-8 w-8 p-1 text-gray-700 hover:text-gray-700/50 border border-gray-700 rounded-md transition-colors hover:border-gray-700/50 outline-none bg-slate-100 shadow-lg" title="Remove all data">
        <TrashIcon />
      </button>
    </div>

    <div class="grid-stack max-w-7xl mx-auto">
      <NoteCard
        v-for="n in notes.data"
        :key="n.id"
        :data="n"
        @edit="() => openModal(n.id)"
        @delete="(id: string) => deleteNote(id)"
        @duplicate="(id: string) => duplicateNote(id)"
        @update:selected-color="(v) => handeUpdate(n, () => n.bgColor = v)"
      />
    </div>
  </div>

  <ModalWrapper v-if="noteDetail" v-model:is-open="isOpen" @update:is-open="() => closeModalAndSave()">
    <NoteDetail
      :isNew="!!newNote"
      :data="noteDetail"
      @delete="(id: string) => deleteNote(id)"
      @duplicate="(id: string) => duplicateNote(id)"
      @cancel="cancelNewNote()"
      @save="closeModalAndSave()"
      @update:title="(v) => handeUpdate(noteDetail!, () => noteDetail!.title = v)"
      @update:content="(v) => handeUpdate(noteDetail!, () => noteDetail!.content = v)"
      @update:selected-color="(v) => handeUpdate(noteDetail!, () => noteDetail!.bgColor = v)"
    />
  </ModalWrapper>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, nextTick, computed } from "vue";
import { useRouter } from "vue-router";
import { useNotesStore } from "@/stores/notes.store";
import NoteCard from "@/components/NoteCard.vue";
import ModalWrapper from '@/components/ModalWrapper.vue';
import NoteDetail from "@/components/NoteDetail.vue";
import { clearLS, seedDemoData } from "@/misc/utils";
import { Cog6ToothIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { GridStack, type GridStackNode } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import type { NoteData } from "@/types/note.type";

const handeUpdate = (note: NoteData, update: () => void) => {
  note.editedAt = Date.now();
  update();
  notes.save();
};

const router = useRouter();
const grid = ref<GridStack>();
const notes = useNotesStore();
const isOpen = ref(false);
const selectedNote = ref<NoteData>();
const newNote = ref<NoteData>();

const noteDetail = computed(() => {
  if (selectedNote.value)
    return selectedNote.value;
  if (newNote.value)
    return newNote.value;

  return null;
});

const openModal = (id: string) => {
  const note = notes.data.find((d) => d.id === id);

  if (!note)
    return closeModalAndSave();

  selectedNote.value = note;
  isOpen.value = true;
  router.push({ name: 'dashboard', params: { id } });
};

const closeModalAndSave = async () => {
  if (newNote.value) {
    notes.data.push(newNote.value);
    await nextTick();
    makeWidget(newNote.value);
  }

  selectedNote.value = undefined;
  newNote.value = undefined;

  notes.save();
  router.push({ name: 'dashboard' });
};

const cancelNewNote = () => {
  isOpen.value = false;
  newNote.value = undefined;
};

const addNote = () => {
  newNote.value = {
    id: crypto.randomUUID(),
    title: '',
    content: '',
    bgColor: '#ffffff',
    editedAt: Date.now(),
    grid: { x: 0, y: 0 }
  };
  isOpen.value = true;
};

const deleteNote = (id: string) => {
  const index = notes.data.findIndex((d) => d.id === id);

  if (index === -1)
    return;

  const selector = `#${CSS.escape(id)}`;
  grid.value!.removeWidget(selector);
  notes.data.splice(index, 1);

  closeModalAndSave();
};

const duplicateNote = async (id: string) => {
  const note = notes.data.find((d) => d.id === id);

  if (!note)
    return;

  const noteCopy = JSON.parse(JSON.stringify(note)) as NoteData;
  noteCopy.id = crypto.randomUUID();
  noteCopy.editedAt = Date.now();

  if (noteCopy.title.length === 0)
    noteCopy.title = 'Empty note copy'
  else if (!noteCopy.title.endsWith(' '))
    noteCopy.title += ' copy'
  else
    noteCopy.title += 'copy'

  notes.data.push(noteCopy);
  await nextTick();
  makeWidget(noteCopy);
};

const initGridStack = () => {
  grid.value = GridStack.init({
    column: 4,
    cellHeight: 200,
    margin: 10
  });

  makeWidgets(notes.data);

  grid.value.on('change', (e: Event, nodes: GridStackNode[]) => {
    notes.patchGrid(nodes);
    notes.save();
  });

  grid.value?.on('resizecontent', () => {
    if (notes.data.every((n) => n.grid.x === 0 && n.grid.w === 1))
      grid.value?.compact('list', false);
  });
}

const makeWidgets = (data: NoteData[]) => {
  data.forEach((d) => {
    makeWidget(d);
  });
};

const makeWidget = (data: NoteData) => {
  const elSelector = `#${data.id}`;
  grid.value!.makeWidget(elSelector);
};

const checkRoute = () => {
  const noteID = router.currentRoute.value.params.id as string;

  if (!noteID)
    return;

  openModal(noteID);
};

const onSeedData = async () => {
  seedDemoData();
  router.go(0);
};

const onClearLS = () => {
  grid.value?.removeAll();
  clearLS();
  notes.load();
};

onBeforeMount(() => {
  notes.load();
});

onMounted(() => {
  initGridStack();
  checkRoute();
});
</script>