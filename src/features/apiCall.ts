

export const getList = <T>(list: T[]): Promise<T[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list)
    }, 2000);
  })
}

export const getItem = <T>(id: string, list: any): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const item = list.filter((item: { id: string; }) => item.id === id);

      resolve(item);
    }, 1000);
  })
}