import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useUsers } from "../context/usersContext";

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 250px;
  width: 100%;
  border: 1px solid #000;
  margin: 10px;
  span {
    margin: 15px;
  }
`

export default function UserContainer() {
  const { users } = useUsers();
  
  let history = useHistory();

  const ShowTodos = (id: string) => {
    history.push(`/${id}`)
  }

  return (
    <FlexContainer>
      {users.map(user => (
        <UserInfo key={user.id} onClick={() => ShowTodos(user.id)}>
          <span>{user.name}</span> <span>{user.username}</span> <span>{user.email}</span>
        </UserInfo>
      ))}
    </FlexContainer>
  )
}