import { TodoistApi } from '@doist/todoist-api-typescript'

export const apiToken = () => localStorage.getItem('todoist')

export const clearToken = () => localStorage.clear()

export const API = (localToken: string | null) =>
  new TodoistApi(localToken ?? '')
