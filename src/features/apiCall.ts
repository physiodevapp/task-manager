

export const getList = <T>(list: T[], boardId?:number): Promise<T[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list.filter((item: any) => !boardId || item.boardId === boardId));
    }, 2000);
  })
}

export const getItem = <T>(id: number, list: any): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const item = list.filter((item: { id: number; }) => item.id === id);

      resolve(item);
    }, 1000);
  })
}

export const postItem = <T>(item: T): Promise<T> => {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve(item);
    }, 2000);
  })
}

export const deleteItem = <T>(item: T): Promise<T> => {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      resolve(item);
    }, 1000);
  })
}