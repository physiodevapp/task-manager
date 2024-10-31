
export interface BoardInterface {
  id: number,
  default: string,
  title: string,
  author: string,
  icon?: string,
}

export interface TaskInterface {
  id: string,
  title: string,
  description: string,
  boardId: number,
  status: string,
  tags?: string[],
}