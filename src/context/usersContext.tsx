import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';

interface UserProviderProps {
  children: ReactNode;
}

interface AddressProps {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: string,
    lng: string,
  }
}

interface CompanyProps {
  name: string,
  catchPhrase: string,
  bs: string,
}

interface UserProps {
  id: string,
  name: string,
  username: string,
  email: string,
  address: AddressProps,
  phone: string,
  website: string,
  company: CompanyProps,
}

interface UserContextData {
  users: Array<UserProps>,
}

const UserContext = createContext({} as UserContextData)

export function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<UserProps[]>([])

  useEffect(() => {
    async function fetchData() {
      const data = await fetchUsers()
      setUsers(data)
    }
    fetchData()
  }, [])

  return (
    <UserContext.Provider
      value={{ users }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUsers(): UserContextData {
  const context = useContext(UserContext)

  return context
}