import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { toDoState } from './atoms'
import Board from './Components/Board'

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`

// Todo Challange:
// 1. Add a new Board.
// 2. Delete a Board.
// 3. Delete a Todo Task.
// 4. save the state in local storage.

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info
    if (!destination) return
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]
        const taskObj = boardCopy[source.index]
        boardCopy.splice(source.index, 1)
        boardCopy.splice(destination?.index, 0, taskObj)
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        }
      })
    }
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]
        const taskObj = sourceBoard[source.index]
        const destinationBoard = [...allBoards[destination.droppableId]]
        sourceBoard.splice(source.index, 1)
        destinationBoard.splice(destination?.index, 0, taskObj)
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        }
      })
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  )
}

export default App
