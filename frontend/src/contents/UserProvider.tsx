import { ReactNode, useState } from 'react'
import UserContext from '~/hooks/useUser'
import { IUser } from '~/type/User/IUser'

type UserContextType = {
  user: IUser | null
  children: ReactNode
}

export const UserProvider = ({ user, children }: UserContextType) => {
  const [userInit, setUser] = useState<IUser | null>(user)

  return <UserContext.Provider value={{ user: userInit, setUser }}>{children}</UserContext.Provider>
}
