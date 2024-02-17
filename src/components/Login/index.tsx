import { ChangeEvent, useState } from 'react'
import { useStorage } from '../../contexts/storageContext'
import { Button } from '../Button'
import { Container } from './styles'

export function Login() {
  const [inputValue, setInputValue] = useState('')
  const { setLocalToken } = useStorage()

  const handleButtonClick = () => {
    const inputValueRegex = inputValue.trim()
    if (inputValueRegex !== '') {
      setLocalToken(inputValueRegex)
      localStorage.setItem('todoist', inputValueRegex)
      setInputValue('')
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <Container>
      <label htmlFor="todoistToken">Token Todoist</label>
      <input
        type="text"
        id="todoistToken"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button onClick={handleButtonClick}>Send</Button>
    </Container>
  )
}
