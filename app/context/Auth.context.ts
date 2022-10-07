import { createContext, useContext } from "react"
import { IUserModel } from "../models"

export interface IAuthParams {
  username: string
  password: string
  grant_type?: string
  scope?: string
}

export interface IAuthContext {
  isSignin: boolean
  signin: (params: IAuthParams) => void
  signout: () => void
  joining: (params: IUserModel) => void
  withdraw: () => void
  refresh: () => void
  user?: IUserModel
}

const noop = () => undefined

export const DefaultAuthContext: IAuthContext = {
  isSignin: false,
  signin: noop,
  signout: noop,
  joining: noop,
  withdraw: noop,
  refresh: noop,
}

export const AuthContext = createContext(DefaultAuthContext)

export const useAuth = () => useContext<IAuthContext>(AuthContext)
