import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchTodos } from '../services/api'

type QuizParams = {
  id: string;
};

interface Todo {
  userId: string,
  id: string,
  title: string,
  completed: boolean
}

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const TodoInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border: 1px solid #000;
  margin: 25px;
`

export default function ToDosContainer() {
  let { id } = useParams<QuizParams>();
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchTodos(id)
      setTodos(data)
    }
    fetchData()
  }, [id])

  const PostStatus = (todo) => {
    todo.completed = !todo.completed
    const newTodo = {
      ...todo, completed: todo.completed
    }
    const index = todos.findIndex(el => el.id === todo.id)
    todos[index] = newTodo;
    console.log(todos)
    fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed: !todo.completed,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
      .then((json) => console.log(json));
  }

  return (
    <TodoContainer>{todos.map(todo => (
      <TodoInfo>
        <span>{todo.userId}</span>
        <span>{todo.id}</span>
        <span>{todo.title}</span>
        <span>{todo.completed ? 'Completed' : 'Pending'}</span>
        <button onClick={() => PostStatus(todo)}>Toggle Completion</button>
      </TodoInfo>
    ))}</TodoContainer>

  )
}