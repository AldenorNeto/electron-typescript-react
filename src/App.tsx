import { CheckboxList } from './components/CheckboxList'
import { Provider } from './contexts/provider'
import { GlobalStyle } from './styles/GlobalStyle'

export function App() {
  return (
    <Provider>
      <>
        <GlobalStyle />
        <CheckboxList />
      </>
    </Provider>
  )
}
