import { create } from "zustand";
import dayjs from "dayjs";

type FilterStoreState = {
  date: dayjs.Dayjs | null;
  time: dayjs.Dayjs | null;
  sortBy: string;
  setDate: (value: dayjs.Dayjs) => void;
  setTime: (value: dayjs.Dayjs) => void;
  setSortBy: (value: string) => void;
};

const useFilterStore = create<FilterStoreState>()((set) => ({
  date: null,
  time: null,
  sortBy: "",
  setDate: (value) => {
    set(() => ({ date: value }));
  },
  setTime: (value) => {
    set(() => ({ time: value }));
  },
  setSortBy: (value) => {
    set(() => ({ sortBy: value }));
  },
}));

export default useFilterStore;
