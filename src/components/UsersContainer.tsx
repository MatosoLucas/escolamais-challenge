import { useHistory } from "react-router-dom";
import { useUsers } from "../context/usersContext";


export default function UserContainer() {
  const { users } = useUsers();

  let history = useHistory();

  const ShowTodos = (id: string) => {
    history.push(`/${id}`)
  }

  return (
    <div className="min-h-screen h-full bg-gray-200">
      <div className="flex w-full justify-center bg-gray-300">
        <span className="text-4xl my-4">User's List</span>
      </div>
      <div className="flex flex-wrap content-start justify-center mt-10">
        {users.map(user => (
          <div className="flex flex-col m-4 max-w-xs w-full h-40 bg-white rounded-md shadow-lg justify-center items-center cursor-pointer" key={user.id} onClick={() => ShowTodos(user.id)}>
            <span className="ml-1 my-2.5">Name: {user.name}</span> <span className="ml-1 my-2.5">User Name: {user.username}</span> <span className="ml-1 my-2.5">Email: {user.email}</span>
          </div>
        ))}
      </div>
    </div>
  )
}