import React from 'react'
import { useSetRecoilState } from 'recoil'
import { Categories, IToDo, toDoState } from '../atoms'

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState)
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id)
      const newToDo = { text, id, category: name as any }
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ]
    })
  }
  return (
    <li>
      <span>{text}</span>

      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          하고있는중
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          할 것
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          완료
        </button>
      )}
    </li>
  )
}

export default ToDo
