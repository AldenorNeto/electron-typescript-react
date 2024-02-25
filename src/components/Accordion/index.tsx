import {
  Children,
  FC,
  ReactElement,
  ReactNode,
  cloneElement,
  useState,
} from 'react'

interface AccordionContainerProps {
  children: ReactNode
}

export const AccordionContainer: FC<AccordionContainerProps> = ({
  children,
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([1])

  const toggleItem = (index: number) => {
    setOpenIndexes((prevIndexes) => {
      const currentIndex = prevIndexes.indexOf(index)
      if (currentIndex > -1) {
        return prevIndexes.filter((itemIndex) => itemIndex !== index)
      } else {
        return [...prevIndexes, index]
      }
    })
  }

  return (
    <div className="accordion">
      {Children.map(children, (child, index) => {
        const isOpen = openIndexes.includes(index)
        return cloneElement(child as ReactElement, {
          isOpen,
          onClick: () => toggleItem(index),
        })
      })}
    </div>
  )
}

interface AccordionItemProps {
  title: string
  children: ReactNode
  isOpen?: boolean
  onClick?: () => void
}

export const AccordionItem: FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
  onClick,
}) => (
  <div className="accordion-item">
    <div className="accordion-title" onClick={onClick}>
      {title}
      {isOpen ? ' -' : ' +'}
    </div>
    {isOpen && <div className="accordion-content">{children}</div>}
  </div>
)
