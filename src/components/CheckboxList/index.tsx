import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useStorage } from '../../contexts/storageContext'
import { api, clearToken } from '../../service/todoistApi'
import { Login } from '../Login'
import { Container, ESC, Taks } from './styles'

interface CheckItems {
  id: number
  label: string
}

export function CheckboxList() {
  const { localToken, setLocalToken } = useStorage()

  const [uncheckedItems, setUncheckedItems] = useState<CheckItems[]>([
    { id: 1, label: 'Item 1 nem tudo que parece é, ta ligado?' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
  ])
  const [checkedItems, setCheckedItems] = useState<CheckItems[]>([])

  const moveItem = (item: CheckItems, isChecked: boolean) => {
    if (isChecked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, item])
      setUncheckedItems((prevUncheckedItems) =>
        prevUncheckedItems.filter(
          (uncheckedItem) => uncheckedItem.id !== item.id,
        ),
      )
    } else {
      setUncheckedItems((prevUncheckedItems) => [...prevUncheckedItems, item])
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((checkedItem) => checkedItem.id !== item.id),
      )
    }
  }

  const getProjects = async (localToken: string | null) => {
    api(localToken)
      .getProjects()
      .then((projects) => console.log(projects))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getProjects(localToken)
  }, [localToken])

  const escButton = () => {
    clearToken()
    setLocalToken(null)
  }

  if (!localToken) {
    return <Login />
  }

  return (
    <Container>
      <ESC>
        <X size={16} onClick={escButton} />
      </ESC>
      {uncheckedItems.length ? (
        <div>
          <h2>Não Marcados</h2>
          {uncheckedItems.map((item) => (
            <Taks key={item.id} onClick={() => moveItem(item, true)}>
              <input
                type="checkbox"
                id={`item${item.id}`}
                name={`item${item.id}`}
                onChange={() => moveItem(item, true)}
              />
              <label htmlFor={`item${item.id}`}>{item.label}</label>
            </Taks>
          ))}
        </div>
      ) : (
        <></>
      )}

      {checkedItems.length ? (
        <div>
          <h2>Marcados</h2>
          {checkedItems.map((item) => (
            <Taks key={item.id} onClick={() => moveItem(item, false)}>
              <input
                type="checkbox"
                id={`item${item.id}`}
                name={`item${item.id}`}
                checked
                onChange={() => moveItem(item, false)}
              />
              <s>
                <label htmlFor={`item${item.id}`}>{item.label}</label>
              </s>
            </Taks>
          ))}
        </div>
      ) : (
        <></>
      )}
    </Container>
  )
}
