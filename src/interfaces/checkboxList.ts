export interface CheckItems {
  id: string
  assignerId?: string | null
  assigneeId?: string | null
  projectId: string
  sectionId?: string | null
  parentId?: string | null
  order: number
  content: string
  description: string
  isCompleted: boolean
  labels: string[]
  priority: number
  commentCount: number
  creatorId: string
  createdAt: string
  due?: (Due & Timezone) | null
  url: string
  duration?: Duration | null
}

export interface Duration {
  amount: number
  unit: 'minute' | 'day'
}

export interface Due {
  date: string
  string: string
  lang?: string | null
  isRecurring: boolean
}

export interface Timezone {
  datetime?: string | null
  timezone?: string | null
  lang?: string | null
}


export interface Projects {
  id: string;
  name: string;
  color: string;
  commentCount: number;
  isShared: boolean;
  isFavorite: boolean;
  url: string;
  isInboxProject: boolean;
  isTeamInbox: boolean;
  order: number;
  viewStyle: string;
} 


export interface AllTask {
  project: Projects
  tasks: CheckItems[]
}