import { baseUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";
import { User } from "../types/User";

export function useRegChat() {
    return useMutation({
        mutationFn: (regInfo: { name: string, password: string, chatId: string }): Promise<User> => fetch(`${baseUrl}/chat/${regInfo.chatId}/reg`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(regInfo) }).then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data)))
    })
}