import React, { useCallback, useEffect, useState } from 'react';
import { app, firebaseConfig } from './Settings';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Write, Read, UpdateTodo } from './Components';
import { getDatabase, ref, set, push, get, remove } from "firebase/database"
import { v4 } from 'uuid';
export interface TodoInterface<T> {
  // id: T | string,
  value: T | string,
  todoId?: string
}
export const App: React.FC = (): JSX.Element => {
  const [todos, setTodos] = useState<TodoInterface<string>[] | null>(null)
  const navigate = useNavigate()
  const db = getDatabase(app)
  const handleGetTodos = useCallback(async (): Promise<void> => {
    const todosRef = await ref(db, "/todos")
    const response = await get(todosRef)
    if (response.exists()) {   
      // const todos: TodoInterface<string>[] = Object.values(response.val())
      const todos: TodoInterface<string>[]  = Object.keys(response.val()).map((item) => {
        return {
          ...response.val()[item],
          todoId: item
        }
      })
      setTodos(todos)
    }
  }, [db])
  const handleKey = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
    if (evt.key === "Enter") {
      const todoRef = push(ref(db, "/todos"))
      set(todoRef, {
        value: (evt.target as HTMLInputElement).value,
      }).then(() => console.log("Todo muvaffaqiyatli qo'shildi")).catch(() => console.log("error"))
    }
    handleGetTodos()
  }
  const handleRemoveTodo = async (todoId: string | undefined):Promise<void> => {
    try{
      const db = await getDatabase(app)
      const delTodoRef = ref(db, "/todos/" + todoId)
      remove(delTodoRef)
      handleGetTodos()
    }catch(error){
      throw new Error("O'chirishda xatolik yuz berdi !")
    }
  }
  useEffect(() => {
    handleGetTodos()
  }, [handleGetTodos])
  return (
    <>
      <Routes>
        <Route path='/' element={
          <>
            <input type="text" onKeyUp={(evt: React.KeyboardEvent<HTMLInputElement>) => handleKey(evt)} />
            <ul>
              {todos?.map((item: TodoInterface<string>) => {
                return (
                  <li key={item.todoId}>
                     {item.value}
                    <button onClick={() => navigate(`/update-todo/${item.todoId}`)}>Update</button>
                    <button onClick={() => handleRemoveTodo(item.todoId)}>Delete</button>
                  </li>
                )
              })}
            </ul>
          </>
        } />
        <Route path='/update-todo/:todoId' element={<UpdateTodo handleGetTodos={handleGetTodos}/>}/>
      </Routes>
    </>
  )
}

export default App;
