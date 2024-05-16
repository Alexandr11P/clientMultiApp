'use client'
import { useRef } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 5000
            }
        }
    })
}

export default function AppQueryClientProvider({ children }: { children: React.ReactNode }) {

    const queryClientRef = useRef<QueryClient | null>(null)
    if (!queryClientRef.current) { queryClientRef.current = makeQueryClient() }
    return <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>
}