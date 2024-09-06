'use client'
import React, { useState } from 'react'
import Button from '../UI/Button/Button'
import classes from './chats.module.scss'
import Input from '../UI/Input/Input'
import { useCreateChat } from './hooks/useCreateChat'
import { useRouter } from 'next/navigation'
import { baseUrl } from '@/env'
function Chats() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const createChat = useCreateChat();

    const router = useRouter();

    function createChatEvent() {
        if (name !== '' || password !== '') {
            createChat.mutateAsync({ name, password })
                .then((data) => {
                    console.log(data)
                })
                .catch((e) => console.log(e))
        }
    }

    if (createChat.data?.chatId) {
        return (<div className={classes.main}>
            <p>Вы создали уникальный чат!</p>
            <p>Cкопируйте данную ссылку:</p>
            <p className={classes.link}>{baseUrl + '/chat/' + createChat.data.chatId}</p>
            <p>и поделитесь ей с друзьями.</p>
            <Button onClick={() => {
                document.cookie = 'id=1; path=/chat; max-age=0';
                router.push('/chat/' + createChat.data.chatId);
            }}>
                Перейти в чат и авторизоваться</Button></div>)
    }

    return (
        <div className={classes.main}>
            {createChat.isError && <div className={classes.error}>Ошибка чат не создан!</div>}
            <Input type="text" placeholder='введите имя пользователя'
                value={name} onChange={e => setName(e.target.value)} />
            <Input type="password" placeholder='введите пароль'
                value={password} onChange={e => setPassword(e.target.value)} />
            <Button onClick={createChatEvent}>Создать уникальный чат</Button>
        </div>
    )
}

export default Chats