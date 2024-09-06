'use client'
import React, { useEffect, useState } from 'react'
import { TodoType } from '../types'
import { useUpdateTodo } from './hooks/useUpdateTodo'
import PopUp from '@/components/shared/PopUp/PopUp'
import Button from '@/components/UI/Button/Button'
import { useDeleteTodo } from './hooks/useDeleteTodo'
import { useQueryClient } from '@tanstack/react-query'
import classes from './todo.module.scss'

function Todo({ todo }: { todo: TodoType }) {
    const [isChecked, setIsChecked] = useState(todo.completed)
    const [errorPopUp, setErrorPopUp] = useState({ isVisible: false, errorText: '' })
    const updateTodo = useUpdateTodo();
    const deleteTodo = useDeleteTodo();
    const queryClient = useQueryClient();
    useEffect(() => setIsChecked(todo.completed), [todo])

    function onChangeTodoCheckbox() {
        if (!isChecked) {
            updateTodo.mutateAsync(todo.id)
                .then(() => setIsChecked(s => !s))
                .catch(e => setErrorPopUp(s => { return { isVisible: true, errorText: e.message } }))
        }
    }

    function removeTodo() {
        deleteTodo.mutateAsync(todo.id)
            .then(() => queryClient.invalidateQueries({ queryKey: ['todos'] }))
            .catch(e => setErrorPopUp(s => { return { isVisible: true, errorText: e.message } }))
    }

    return (
        <div className={classes.main}><span style={{ textDecoration: isChecked ? 'line-through' : 'none' }}>{todo.text}</span>
            <input type="checkbox" checked={isChecked} disabled={updateTodo.isPending}
                onChange={onChangeTodoCheckbox} />
            <Button onClick={removeTodo} disabled={deleteTodo.isPending}>Удалить</Button>
            <PopUp isVisible={errorPopUp.isVisible} minWidth={100} buttons={[{
                text: 'ok', onclick: () =>
                    setErrorPopUp(s => { return { ...s, isVisible: false } })
            }]}>Ошибка:{errorPopUp.errorText}</PopUp>
        </div>
    )
}

export default Todo