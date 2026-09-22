import { useQuery } from "@tanstack/react-query";
import { getQuests } from "../services/questService.js";

export function useQuests() {
  return useQuery({
    queryKey: ["quests"],
    queryFn: getQuests
  });
}
