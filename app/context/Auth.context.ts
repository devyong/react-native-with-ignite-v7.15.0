import { createContext, useContext } from "react"
import { IUserModel } from "../models"

export interface IAuthentication {
  isSignIn: boolean
  signin: (username: string, password: string) => void
  signout: () => void
  withdraw: () => void
  user?: IUserModel
}

const noop = () => undefined

export const DefaultAuthContext: IAuthentication = {
  isSignIn: false,
  signin: noop,
  signout: noop,
  withdraw: noop,
}

export const AuthenticationContext = createContext(DefaultAuthContext)

export const useAuth = () => useContext<IAuthentication>(AuthenticationContext)
