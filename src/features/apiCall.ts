

export const getList = <T>(list: T[], boardId?:string): Promise<T[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list.filter((item: any) => !boardId || item.boardId === boardId));
    }, 600);
  })
}

export const getItem = <T>(id: number, list: any[]): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const item = list.filter((item: { id: number; }) => item.id === id) as T;

      resolve(item);
    }, 600);
  })
}

export const postItem = <T>(item: T): Promise<T> => {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve(item);
    }, 600);
  })
}

export const deleteItem = <T>(item: T): Promise<T> => {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve(item);
    }, 600);
  })
}

export const updateItem = <T>(item: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(item);
    }, 600);
  })
}