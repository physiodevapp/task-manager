

export const getList = (list) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list)
    }, 2000);
  })
}