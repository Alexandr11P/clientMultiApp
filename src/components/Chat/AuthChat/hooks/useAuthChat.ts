import { baseUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";
import { User } from "../types/User";

export function useAuthChat() {
    return useMutation({
        mutationFn: (authInfo: { name: string, password: string, chatId: string }): Promise<User> => fetch(`${baseUrl}/chat/${authInfo.chatId}/auth`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(authInfo) }).then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data)))
    })
}