export const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return data;
}

export const fetchTodos = async(id: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
  const data = await response.json()
  return data;
}