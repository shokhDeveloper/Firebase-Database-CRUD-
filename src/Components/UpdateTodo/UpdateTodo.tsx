import { get, getDatabase, ref, set } from "firebase/database";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../../Settings";
import { TodoInterface } from "../../App";
import { v4 } from "uuid";
interface UpdateTodoProps {
    handleGetTodos: () => Promise<void>
}
export const UpdateTodo: React.FC<UpdateTodoProps> = ({handleGetTodos}): JSX.Element => {
    const {todoId} = useParams()
    const [updateValue, setUpdateValue] = useState<string | null>(null)
    const [updateTodo, setUpdateTodo] = useState<TodoInterface<string> | null>(null)
    const navigate = useNavigate()
    const handleUpdate = async ():Promise<void> => {
        const db = await getDatabase(app)
        const todosRef = ref(db, "/todos/" + todoId)
        set(todosRef, {
            value: updateValue
        }).then(() => navigate(-1))
        handleGetTodos()
    }
    const handleGetTodo = useCallback(async ():Promise<void> => {
        const db = await getDatabase(app)
        const todoRef = await ref(db, "/todos/" + todoId)
        const snapshotTodo = await get(todoRef)
        if((await snapshotTodo).exists()){
            const todo:TodoInterface<string> = snapshotTodo.val()
            setUpdateTodo(todo)    
        }
    },[todoId])
    useEffect(() => {
        handleGetTodo()
    },[handleGetTodo])
    return (
        <>
            <input type="text" onChange={(evt:React.ChangeEvent<HTMLInputElement>) => setUpdateValue(evt.target.value) } defaultValue={updateTodo?.value}/>
            <button onClick={handleUpdate}>Update</button>
        </>
    )
} 