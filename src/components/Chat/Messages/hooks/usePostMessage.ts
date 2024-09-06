import { baseUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";

export function usePostMessage() {
    return useMutation({
        mutationFn: ({ text, chatId }: { text: string, chatId: string }) => fetch(`${baseUrl}/chat/${chatId}/message`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) }).then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data)))
    })
}