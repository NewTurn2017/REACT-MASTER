import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? 'tomato' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? '0 2px 10px 0 rgba(0,0,0,0.5)' : 'none'};
`

interface IDragabbleCardProps {
  toDo: string
  index: number
}
function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DragabbleCard)
