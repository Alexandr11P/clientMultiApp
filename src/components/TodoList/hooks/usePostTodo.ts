import { baseUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";
import { TodoType } from "../types";

export function usePostTodo() {
    return useMutation({
        mutationFn: (newTodo: { text: string }): Promise<TodoType> => fetch(`${baseUrl}/todos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTodo) }).then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data)))
    })
}