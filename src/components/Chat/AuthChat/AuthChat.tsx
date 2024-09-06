'use client'
import Button from '@/components/UI/Button/Button'
import React, { useState } from 'react'
import clases from './authChat.module.scss'
import Input from '@/components/UI/Input/Input'
import { useRegChat } from './hooks/useRegChat'
import { useAuthChat } from './hooks/useAuthChat'
import { User } from './types/User'
import { useQueryClient } from '@tanstack/react-query'
function AuthChat({ setIsAuth, chatId }: { setIsAuth: React.Dispatch<React.SetStateAction<boolean>>, chatId: string }) {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const reg = useRegChat();
    const auth = useAuthChat();
    const queryClient = useQueryClient();

    function success(data: User) {
        document.cookie = `id=${data.id}`;
        document.cookie = `name=${data.name}`;
        document.cookie = `password=${data.password}`;
        queryClient.resetQueries({ queryKey: ['messages'] })
        setIsAuth(true)
    }

    function entrance() {
        auth.mutateAsync({ name, password, chatId }).then(data => success(data))
    }
    function registration() {
        reg.mutateAsync({ name, password, chatId }).then(data => success(data))
    }

    return (
        <div className={clases.main}>
            {auth.isError && <p className={clases.red}>{String(auth.error.message)}</p>}
            {reg.isError && <p className={clases.red}>{String(reg.error.message)}</p>}
            <Input placeholder='Имя пользователя' type="text" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder='Пароль' type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <div className={clases.buttonBox}>
                <Button onClick={entrance} disabled={reg.isPending || auth.isPending}>Войти</Button>
                <Button onClick={registration} disabled={reg.isPending || auth.isPending}>Зарегистрироваться</Button>
            </div>
        </div>
    )
}

export default AuthChat