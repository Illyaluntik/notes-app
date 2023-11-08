import type { NoteData } from '@/types/note.type'
import type { GridStackNode } from "gridstack";
import { defineStore } from 'pinia'

export const LS_KEY = 'notes';

type State = {
  data: NoteData[]
};

export const useNotesStore = defineStore('notes', {
  state: (): State => ({
    data: [],
  }),
  actions: {
    load() {
      this.data = JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') as NoteData[];
    },
    save() {
      localStorage.setItem(LS_KEY, JSON.stringify(this.data));
    },
    patchGrid(nodes: GridStackNode[]) {
      nodes.forEach((node) => {
        const noteToUpdate = this.data.find((d) => node.id === d.id);
        const { x, y, w, h } = node;

        if (!noteToUpdate)
          return;

        noteToUpdate.grid = { x, y, w, h };
      });
    },
    onChange(id: string) {
      const note = this.data.find((d) => d.id === id);

      if (!note)
        return;

      note.editedAt = Date.now();
    }
  },
});
