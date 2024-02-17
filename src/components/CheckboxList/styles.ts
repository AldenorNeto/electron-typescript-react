import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #ffffff;
  background-color: #39393980;
  border-radius: 10px;
  user-select: none;
  height: 100vh;
  gap: 5px;
  padding: 5px;
  transform-origin: bottom center;

  h2 {
    margin-bottom: 5px;
  }

  input[type='checkbox'] {
    margin-right: 5px;
    vertical-align: middle;
  }

  label {
    width: 100%;
  }

  s {
    text-decoration: line-through;
  }
`

export const Taks = styled.div`
  transition: background-color 0.3s;
  border-radius: 5px;
  width: 100%;
  padding: 5px;

  &:hover {
    background-color: #fff1;
  }
`

export const ESC = styled.div`
  background-color: #fff1;
  position: absolute;
  border-radius: 9999px;
  top: 0;
  right: 0;
  font-size: 10%;

  * {
    font-size: 10%;
  }

  &:hover {
    background-color: #c44;
  }
`
