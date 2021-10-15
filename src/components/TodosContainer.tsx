import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export default function ToDosContainer() {
  let { id } = useParams<QuizParams>();
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [addTitle, setTitle] = useState('')

  useEffect(() => {
    async function fetchData() {
      const data = await fetchTodos(id)
      setTodos(data)
    }
    fetchData()
  }, [id])

  const PostTodo = (title: string) => {
    fetch('https://jsonplaceholder.typicode.com/todos/', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        completed: false,
        userId: id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTodos([json, ...todos])
      });
  }

  const PostStatus = (todo) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed: !todo.completed,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(() => {
      const newTodo = {
        ...todo, completed: !todo.completed
      }
      const index = todos.findIndex(el => el.id === todo.id)
      const newTodos = [...todos];
      newTodos[index] = newTodo;
      setTodos(newTodos)
    });
  }

  return (
    <div className="min-h-screen h-full bg-gray-200 pb-4">
      <div className="flex w-full bg-gray-300">
        <a className="ml-5 my-5 absolute" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
        </a>
        <span className="mx-auto text-4xl my-4">TODO List</span>
      </div>
      <div className="md:flex-row mx-auto flex flex-col bg-white rounded-md shadow-lg max-w-xs w-full h-28 md:h-16 md:max-w-xl lg:max-w-2xl my-10 ">
        <input className="my-auto mx-auto md:text-left md:w-7/12 text-center h-12 text-xl rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent" placeholder="Add a new TODO" onChange={(e) => setTitle(e.target.value)}></input>
        <button className="bg-gray-200 active:bg-gray-400 h-10 w-3/4 md:w-4/12 rounded-md mx-auto my-auto " onClick={() => PostTodo(addTitle)}>Create a new TODO</button>
      </div>
      <div className="flex flex-wrap content-start justify-center mt-10">
        {todos.map(todo => (
          <div className="flex flex-col m-4 max-w-xs w-full h-52 p-4 bg-white rounded-md shadow-lg" key={todo.id}>
            <p className="text-xl mb-4 text-center break-words">{todo.title}</p>
            {
              todo.completed
                ?
                <span className="mt-auto text-center text-green-700">Status: Completed</span>
                :
                <span className="mt-auto text-center text-yellow-400">Status: Pending</span>
            }
            <button className="bg-gray-200 w-1/2 active:bg-gray-400 mx-auto mt-2 rounded-md" onClick={() => PostStatus(todo)}>Change Status</button>
          </div>
        ))}
      </div>
    </div>
  )
}