
export interface BoardInterface {
  id: number,
  default: string,
  title: string,
  author: string,
}

export interface TaskInterface {
  id: number,
  title: string,
  description: string,
  boardId: number,
  status: string,
}