
export interface BoardInterface {
  id: string,
  default: string,
  title: string,
  author: string,
  icon?: string,
}

export interface TaskInterface {
  id: string,
  title: string,
  description: string,
  boardId: string,
  status: string,
  tags?: string[],
}