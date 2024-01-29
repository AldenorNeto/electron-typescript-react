import { Container } from './styles'

export function Greetings() {
  function handleSayHello() {
    window.Main.sendMessage('Hello World')

    console.log('Message sent! Check main process log in terminal.')
  }

  return (
    <Container>
      <h1>Conteúdo do Seu Aplicativo</h1>
    </Container>
  )
}

