
export interface BoardInterface {
  id: number,
  title: string,
  author: string,
}

export interface TaskInterface {
  id: number,
  title: string,
  description: string,
  boardId: number,
}