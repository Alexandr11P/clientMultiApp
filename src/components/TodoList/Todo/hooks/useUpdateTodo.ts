import { baseUrl } from "@/env";
import { useMutation } from "@tanstack/react-query";
import { TodoType } from "../../types";

export function useUpdateTodo() {
    return useMutation({
        mutationFn: (id: number): Promise<TodoType> => fetch(`${baseUrl}/todos`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) }).then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data)))
    })
}