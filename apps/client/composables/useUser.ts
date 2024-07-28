const user = shallowRef()

// TODO Запрос на получение пользователя

export function useUser() {
  return {
    user,
  }
}
