import React, { useEffect, useState } from 'react'
import { useGetMessages } from './hooks/useGetMessages'
import Spinner from '@/components/UI/Loaders/Spinner/Spinner'
import classes from './messages.module.scss'
import Button from '@/components/UI/Button/Button'
import { usePostMessage } from './hooks/usePostMessage'
import { getMessagesLong } from './actions/getMessagesLong'
import { useQueryClient } from '@tanstack/react-query'
function Messages({ setIsAuth, chatId }: { setIsAuth: React.Dispatch<React.SetStateAction<boolean>>, chatId: string }) {

    const { data, isError, isFetching } = useGetMessages(chatId);
    const postMessage = usePostMessage();
    const queryClient = useQueryClient();
    const [text, setText] = useState('');

    useEffect(() => { getMessagesLong(chatId, queryClient) }, [])

    useEffect(() => {
        if (isError) {
            setIsAuth(false)
        }
    }, [isError])


    if (isFetching) { return <Spinner /> }
    const name = document.cookie.split('; ').filter((e) => e.includes('name'))[0].replace('name=', '')

    function cookieClear() {
        document.cookie = 'id=0; max-age=0';
        document.cookie = 'name=0; max-age=0';
        document.cookie = 'password=0; max-age=0';
        location.reload()
    }

    return (
        <>
            <Button style={{ background: 'gray', position: 'fixed', top: '70px', left: '30px' }}
                onClick={cookieClear}
            >Выйти из чата</Button>
            <div className={classes.main}>
                {data.map(e => <div className={classes.message} key={e.id}
                    style={e.User.name === name ? { marginLeft: '30%', background: 'aquamarine' } : {}}>
                    <div className={classes.name}>{e.User.name + ':'}</div><div className={classes.text}>{e.text}</div></div>)}
            </div>
            <div className={classes.send}>
                <textarea placeholder='Напишите сообщение' value={text} onChange={(e) => setText(e.target.value)}>
                </textarea>
                <Button onClick={() => postMessage.mutateAsync({ text, chatId }).then(() => setText(''))}>Отправить</Button>
            </div>
        </>
    )
}

export default Messages