import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "@/env";

export function useGetApt() {
    return useQuery<Apartment[], {
        data: any, status: number
    }>({
        queryKey: ['apt'],
        queryFn: () => fetch(`${baseUrl}/allapt`).then(res => res.ok ? res.json() : Promise.reject({ data: res.json().then(d => d).catch(() => 'В теле ответа отсутствует JSON'), status: res.status })),
        initialData: [],
    })
}