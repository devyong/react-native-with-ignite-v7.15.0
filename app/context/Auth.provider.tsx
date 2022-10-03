import React from "react"
import { AuthenticationContext } from "./Auth.context"
import {
  isLoggedIn,
  setAuthTokens,
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
} from "react-native-axios-jwt"
import { useStores } from "../stores"
import { getEnv } from "mobx-state-tree"
import { IUserModel } from "../models"
import { UserApi } from "../services"
import { isEmpty } from "validate.js"
const { AUTH_API_URL, AUTH_API_TIMEOUT } = require("../../config/env")

interface IAuthenticatonProviderProps {
  children: React.ReactNode
}

export const AuthenticationProvider = ({ children }: IAuthenticatonProviderProps) => {
  const [isSignIn, setSignIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState<IUserModel>(undefined)
  const rootStore = useStores()
  const { api } = getEnv(rootStore)

  React.useEffect(() => {
    // Check if refresh token exists
    // FIXME - 결과에 쓰레기값이 들어가는 문제가 있음, react-native-axios-jwt 라이브러리의 문제
    // {
    // _1:0
    // _2:0
    // _3:null
    // _4:null
    // },
    if (isLoggedIn()) {
      getRefreshToken().then((rt) => {
        if (rt) {
          // Assume we are logged in because we have a refresh token
          // However, you may need user data that is not included in the access token,
          // and you may need to make a request to the server.
          findMe()
        } else {
          setSignIn(false)
          setLoading(false)
        }
      })
    } else {
      setSignIn(false)
      setLoading(false)
      console.tron.logImportant("Not logged in: No refresh token")
    }
    return () => {
      setLoading(true)
    }
  }, [])

  // 4. Log in by POST-ing the email and password and get tokens in return
  // and call setAuthTokens with the result.
  const signin = async (params) => {
    const response = await api.axios.post(`${AUTH_API_URL}/auth/login`, params, {
      timeout: AUTH_API_TIMEOUT,
    })

    // save tokens to storage
    await setAuthTokens({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    })
  }

  // 5. Log out by clearing the auth tokens from AsyncStorage
  const signout = () => clearAuthTokens()

  const withdraw = async () => {
    const userApi = new UserApi(api)
    await userApi.withdraw()
  }

  const findMe = async () => {
    const userApi = new UserApi(api)
    const result = await userApi.getMe()
    if (result.kind === "ok") {
      setUser(result.data)
      setSignIn(true)
      setLoading(false)
    } else {
      setSignIn(false)
      setLoading(false)
    }
  }

  return (
    <AuthenticationContext.Provider value={{ isSignIn, signin, signout, withdraw, user }}>
      {!loading && children}
    </AuthenticationContext.Provider>
  )
}
