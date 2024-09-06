import { baseUrl } from "@/env";
import type { QueryClient } from "@tanstack/react-query";


export function getMessagesLong(chatId: string, queryClient: QueryClient) {
    fetch(`${baseUrl}/chat/${chatId}/meslong`)
        .then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data)))
        .then((data) => {
            if (data.status === 'refetch') { getMessagesLong(chatId, queryClient) }
            else {
                queryClient.setQueryData(['messages'], data)
                getMessagesLong(chatId, queryClient)
            }
        })
        .catch((err) => console.log(err))
}