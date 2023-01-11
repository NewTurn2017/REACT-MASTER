﻿import React from 'react'
import { useRecoilValue } from 'recoil'
import { toDoSelector } from '../atoms'
import CreateToDo from './CreateToDo'
import ToDo from './ToDo'

function ToDoList() {
  const [toDo, doing, done] = useRecoilValue(toDoSelector)
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <h2>To Do</h2>
      <ul>
        {toDo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((done) => (
          <ToDo key={done.id} {...done} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((done) => (
          <ToDo key={done.id} {...done} />
        ))}
      </ul>
    </div>
  )
}

export default ToDoList
