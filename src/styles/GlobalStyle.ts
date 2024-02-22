import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  body {
    width: 99%;
    min-height: 100%;
  }

  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #fff9;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: #fff3;
  }
`
