import { StorageProvider } from './storageContext'

export function Provider({ children }: { children: JSX.Element }) {
  return <StorageProvider>{children}</StorageProvider>
}
