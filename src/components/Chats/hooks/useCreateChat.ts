import { baseUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";

export function useCreateChat() {
    return useMutation({
        mutationFn: (newChat: { name: string, password: string }): Promise<{ chatId: string }> => fetch(`${baseUrl}/chat/create`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newChat) }).then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data)))
    })
}