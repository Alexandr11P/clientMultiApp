import TodoList from "@/components/TodoList/TodoList";
import { baseUrl } from "@/env";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

export const revalidate = 5

async function TodoListPage() {

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['todos'],
        queryFn: () => fetch(`${baseUrl}/todos`).then(res => res.json()),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <TodoList />
        </HydrationBoundary>
    )
}

export default TodoListPage