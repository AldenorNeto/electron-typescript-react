import styled, { keyframes } from 'styled-components'

const fadeInOut = keyframes`
  100% {
    background-color: #fff0;
    color: #fff0;
    border: #fff0;
  }
`

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
  overflow-y: auto;

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

  input[type='checkbox']:checked + label {
    text-decoration: line-through;
    opacity: 0.5;
    animation: ${fadeInOut} 1s ease-in-out forwards;
  }
`

export const CustomCheckbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #aaa;
  outline: none;

  &:checked {
    background-color: #fff;
    border-color: #555;
    animation: ${fadeInOut} 1s ease-in-out forwards;
  }

  &:hover {
    cursor: pointer;
  }

  &:checked::after {
    content: '✔';
    font-size: 12px;
    color: #555;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const TaskLabel = styled.label`
  width: 100%;
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
