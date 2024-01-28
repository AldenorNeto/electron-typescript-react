import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #E1E1E6;
    width: 100%;
    height: 90vh;
    background-color: rgba(255, 0, 0, 0.19);
    border-radius: 10px;
    user-select: none;
  }
`
