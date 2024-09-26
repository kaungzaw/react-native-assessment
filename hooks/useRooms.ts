import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useFilterStore from "@/store/filterStore";

export type RoomAvailability = {
  name: string;
  capacity: number;
  level: number;
  available: boolean;
};

export default function useRooms() {
  const { date, time, sortBy } = useFilterStore();
  return useQuery({
    queryKey: ["rooms", { date, time: time?.format("HH:mm"), sortBy }],
    queryFn: fetchRooms,
  });
}

async function fetchRooms({ queryKey }: any) {
  const [_key, { date, time, sortBy }] = queryKey;
  if (date && time) {
    const [response] = await Promise.all([
      axios.get(
        "https://gist.githubusercontent.com/yuhong90/7ff8d4ebad6f759fcc10cc6abdda85cf/raw/463627e7d2c7ac31070ef409d29ed3439f7406f6/room-availability.json"
      ),
      new Promise<void>((resolve) => setTimeout(() => resolve(), 500)),
    ]);
    const rooms = response.data;
    const roomAvailabilityList: RoomAvailability[] = rooms.map((item: any) => ({
      ...item,
      capacity: Number(item.capacity),
      level: Number(item.level),
      available: Boolean(Number(item.availability[time])),
    }));
    if (sortBy === "Location") {
      return roomAvailabilityList.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );
    }
    if (sortBy === "Capacity") {
      return roomAvailabilityList.sort((a, b) => a.capacity - b.capacity);
    }
    if (sortBy === "Availability") {
      return roomAvailabilityList.sort(
        (a, b) => Number(b.available) - Number(a.available)
      );
    }
    return roomAvailabilityList;
  }
  return [];
}
