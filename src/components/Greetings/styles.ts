import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #ffffff;
  background-color: #39393980;
  border-radius: 10px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 25px;
  display: flex;
  flex-direction: column;
  animation: slideIn 1s forwards;
  transform-origin: bottom center;
  align-items: center;
  justify-content: center;

  @keyframes slideIn {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

export const Image = styled.img`
  width: 240px;
  animation: ${rotate} 15s linear infinite;
`

export const Text = styled.p`
  margin-top: 24px;
  font-size: 18px;
`
