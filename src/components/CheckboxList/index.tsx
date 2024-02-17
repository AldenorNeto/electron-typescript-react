import { useState } from 'react'

interface CheckItems {
  id: number
  label: string
}

export function CheckboxList() {
  const [uncheckedItems, setUncheckedItems] = useState<CheckItems[]>([
    { id: 1, label: 'Item 1' },
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

  return (
    <div>
      <div>
        <h2>Não Marcados</h2>
        {uncheckedItems.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              id={`item${item.id}`}
              name={`item${item.id}`}
              onChange={(e) => moveItem(item, e.target.checked)}
            />
            <label htmlFor={`item${item.id}`}>{item.label}</label>
          </div>
        ))}
      </div>

      <div>
        <h2>Marcados</h2>
        {checkedItems.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              id={`item${item.id}`}
              name={`item${item.id}`}
              checked
              onChange={(e) => moveItem(item, e.target.checked)}
            />
            <label htmlFor={`item${item.id}`}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
