import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useStorage } from '../../contexts/storageContext'
import { AllTask, CheckItems } from '../../interfaces/checkboxList'
import { API, clearToken } from '../../service/todoistApi'
import { AccordionContainer, AccordionItem } from '../Accordion'
import { Login } from '../Login'
import { Container, CustomCheckbox, ESC, Taks, TaskLabel } from './styles'

export function CheckboxList() {
  const { localToken, setLocalToken } = useStorage()
  const [uncheckedItems, setUncheckedItems] = useState<AllTask[]>([])
  const [todayUncheckedItems, setTodayUncheckedItems] =
    useState<AllTask | null>(null)
  const api = API(localToken)

  const closeTask = (id: string) => {
    try {
      api.closeTask(id)
      const checkbox = document.getElementById(
        `id${id}`,
      ) as HTMLInputElement | null
      if (checkbox) {
        checkbox.checked = !checkbox.checked
      }
      getProjects()
    } catch (_) {
      console.error('Não fio possivel finalizar tarefa')
    }
  }

  const getProjects = async () => {
    try {
      const projects = await api.getProjects()
      const allTask: AllTask[] = await Promise.all(
        projects.map(async (project) => {
          try {
            const tasks = await api.getTasks({ projectId: project.id })
            return { project, tasks }
          } catch (e) {
            return { project, tasks: [] as CheckItems[] }
          }
        }),
      )

      const projectBeforeDate = allTask.filter((v) => v && v.tasks.length)
      const taskToDay = projectBeforeDate.map(
        ({ project, tasks }): AllTask => ({
          project,
          tasks: tasks.filter(
            (d) =>
              d &&
              new Date(d.due?.date ?? '').getTime() <= new Date().getTime(),
          ),
        }),
      )

      const projectAfterDate = taskToDay.filter((v) => v && v.tasks.length)
      const uuid = uuidv4()

      const formatToday: AllTask = {
        project: { ...projectAfterDate[0]?.project, id: uuid, name: '🎯 Hoje' },
        tasks: ([] as CheckItems[]).concat(
          ...projectAfterDate.map((v) => v.tasks),
        ),
      }

      setUncheckedItems(projectBeforeDate)
      setTodayUncheckedItems(formatToday)

      return projects
    } catch (e) {
      console.error(e)
      return e
    }
  }

  console.log({ uncheckedItems })

  const recursiveGetProjects = async () => {
    await getProjects()
    setTimeout(() => {
      recursiveGetProjects()
    }, 60000)
  }

  useEffect(() => {
    if (localToken) {
      recursiveGetProjects()
    }
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
      <AccordionContainer>
        {todayUncheckedItems && todayUncheckedItems.tasks.length ? (
          <AccordionItem title={todayUncheckedItems.project.name}>
            {todayUncheckedItems.tasks.map(({ id, content }) => (
              <Taks key={`key${id}`} onClick={() => closeTask(id)}>
                <CustomCheckbox
                  type="checkbox"
                  id={`id${id}`}
                  name={`name${id}`}
                />
                <TaskLabel htmlFor={`htmlFor${id}`}>{content}</TaskLabel>
              </Taks>
            ))}
          </AccordionItem>
        ) : (
          <></>
        )}
        {(uncheckedItems.length ? uncheckedItems : []).map(
          ({ project, tasks }, index) => (
            <AccordionItem title={project.name} key={index}>
              {tasks.map(({ id, content }) => (
                <Taks key={`key${id}`} onClick={() => closeTask(id)}>
                  <CustomCheckbox
                    type="checkbox"
                    id={`id${id}`}
                    name={`name${id}`}
                  />
                  <TaskLabel htmlFor={`htmlFor${id}`}>{content}</TaskLabel>
                </Taks>
              ))}
            </AccordionItem>
          ),
        )}
      </AccordionContainer>

      {todayUncheckedItems &&
      todayUncheckedItems.tasks.length &&
      uncheckedItems.length ? (
        <h2>Não à tarefas para hoje, descanse!</h2>
      ) : (
        <></>
      )}
    </Container>
  )
}
