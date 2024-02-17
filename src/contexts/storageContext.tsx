import { ReactNode, createContext, useContext, useState } from 'react'
import { apiToken } from '../service/todoistApi'

interface StorageValues {
  localToken: string | null
  setLocalToken: React.Dispatch<React.SetStateAction<string | null>>
}

const StorageContext = createContext({} as StorageValues)

interface StorageProviderProps {
  children: ReactNode
}

export function StorageProvider({ children }: StorageProviderProps) {
  const [localToken, setLocalToken] = useState<string | null>(apiToken())

  return (
    <StorageContext.Provider value={{ localToken, setLocalToken }}>
      {children}
    </StorageContext.Provider>
  )
}

export function useStorage() {
  return useContext(StorageContext)
}
