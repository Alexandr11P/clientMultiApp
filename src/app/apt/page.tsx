import Apts from "@/components/Apts/Apts"
import { baseUrl } from "@/env"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export const revalidate = 5

async function AptsPage() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['apt'],
        queryFn: () => fetch(`${baseUrl}/allapt`).then(res => res.json()),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Apts />
        </HydrationBoundary>
    )
}

export default AptsPage