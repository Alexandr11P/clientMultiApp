import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "@/env";
import type { Message } from "../types/Message"

export function useGetMessages(chatId: string) {
    return useQuery<Message[]>({
        queryKey: ['messages'],
        queryFn: () => fetch(`${baseUrl}/chat/${chatId}/messages`).then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data))),
        initialData: [],
        staleTime: 0
    })
}