'use client'
import React, { useState } from 'react'
import { useGetTodos } from './hooks/useGetTodos'
import Todo from './Todo/Todo'
import Button from '../UI/Button/Button'
import { usePostTodo } from './hooks/usePostTodo'
import { useQueryClient } from '@tanstack/react-query'
import classes from './todoList.module.scss'
import Spinner from '../UI/Loaders/Spinner/Spinner'


function TodoList() {
    const queryClient = useQueryClient();
    const { data, error, isFetching } = useGetTodos()
    const [newTodoText, setNewTodoText] = useState('')
    const postTodo = usePostTodo();

    function addTodo() {
        if (newTodoText !== '') {
            postTodo.mutateAsync({ text: newTodoText })
                .then(() => {
                    queryClient.invalidateQueries({ queryKey: ['todos'] });
                    setNewTodoText('')
                })
                .catch((e) => console.log(e))
        }
    }

    if (isFetching && !data[0]) { return <Spinner /> }
    return (
        <div className={classes.main}>
            <div className={classes.addTodo}>
                <input type="text" value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)} />
                <Button onClick={addTodo} disabled={postTodo.isPending}>add todo</Button>
            </div>
            <div className={classes.list}>{data.map(e => <Todo key={e.id} todo={e} />)}</div>
            {error && <>
                <h2>Ошибка соединения с сервером!</h2>
                <p>Проверьте подключение к интернету и обновите страницу</p>
            </>}
        </div>

    )
}

export default TodoList