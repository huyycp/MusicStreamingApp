import { createContext, useContext } from 'react'
import { IUser } from '~/type/User/IUser'

interface UserContextProps {
  user: IUser | null
  // eslint-disable-next-line no-unused-vars
  setUser: (user: IUser | null) => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export default UserContext
