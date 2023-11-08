export type NoteData = {
  id: string;
  title: string;
  content: string;
  editedAt: number;
  bgColor: string;
  grid: {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
  };
};