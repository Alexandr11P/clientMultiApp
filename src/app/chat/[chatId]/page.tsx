import Chat from "@/components/Chat/Chat"
import { cookies } from "next/headers"



function ChatPage({ params }: { params: { chatId: string } }) {
    const cookie = cookies().getAll().map(e => e.name)
    const check = cookie.some((e) => e === 'name') && cookie.some((e) => e === 'password') && cookie.some((e) => e === 'id')

    return (
        <div><Chat cookie={check} chatId={params.chatId} /> </div>
    )
}

export default ChatPage