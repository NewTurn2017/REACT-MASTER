import styled from 'styled-components'

const Father = styled.div`
  display: flex;
`
const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`

function App() {
  return (
    <Father>
      <Btn>Login in</Btn>
      <Btn as="a" href="/">
        Login in
      </Btn>
    </Father>
  )
}

export default App
