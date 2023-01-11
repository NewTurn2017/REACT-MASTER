import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Categories, categoryState, toDoSelector } from '../atoms'
import CreateToDo from './CreateToDo'
import ToDo from './ToDo'

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector)
  const [category, setCategory] = useRecoilState(categoryState)
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any)
  }

  return (
    <div>
      <h1>TO DO LIST</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>할 것</option>
        <option value={Categories.DOING}>하고있는중</option>
        <option value={Categories.DONE}>완료</option>
      </select>

      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  )
}

export default ToDoList
