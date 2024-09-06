import { useQuery } from "@tanstack/react-query";
import { TodoType } from "../types";
import { baseUrl } from "@/env";

export function useGetTodos() {
    return useQuery<TodoType[]>({
        queryKey: ['todos'],
        queryFn: () => fetch(`${baseUrl}/todos`).then(res => res.ok ? res.json() : res.json().then(data => Promise.reject(data))),
        initialData: []
    })
}