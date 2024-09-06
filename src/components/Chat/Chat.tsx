'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import AuthChat from './AuthChat/AuthChat'
import Button from '../UI/Button/Button'
import Messages from './Messages/Messages'


function Chat({ cookie, chatId }: { cookie: boolean, chatId: string }) {
    const [isAuth, setIsAuth] = useState(cookie)


    if (!isAuth) {
        return (<AuthChat chatId={chatId} setIsAuth={setIsAuth} />)
    }

    return (
        <Messages chatId={chatId} setIsAuth={setIsAuth} />
    )
}

export default Chat