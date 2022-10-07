import Axios from "axios"
import { getEnv } from "mobx-state-tree"
import React from "react"
import { clearAuthTokens, getRefreshToken, isLoggedIn, setAuthTokens } from "react-native-axios-jwt"
import { IUserModel } from "../models"
import { UserApi } from "../services"
import { useStores } from "../stores"
import { AuthContext, IAuthParams } from "./Auth.context"
import sha256 from "crypto-js/sha256"
import Base64 from "../utils/Base64"
import { AuthApi } from "../services/Auth.api"
const {
  AUTH_API_URL,
  AUTH_API_TIMEOUT,
  AUTH_API_CLIENT_ID,
  AUTH_API_CLIENT_SECRET,
} = require("../../config/env")

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isSignin, setSignin] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState<IUserModel>(undefined)
  const rootStore = useStores()
  const { api } = getEnv(rootStore)

  React.useEffect(() => {
    // Check if refresh token exists
    // FIXME - 결과에 쓰레기값이 들어가는 문제가 있음, react-native-axios-jwt 라이브러리의 문제
    if (isLoggedIn()) {
      getRefreshToken().then((rt) => {
        setLoading(false)
        if (rt) {
          // Assume we are logged in because we have a refresh token
          // However, you may need user data that is not included in the access token,
          // and you may need to make a request to the server.
          setSignin(true)
          findMe()
        } else {
          setSignin(false)
        }
      })
    } else {
      setSignin(false)
      setLoading(false)
      console.tron.logImportant("Not logged in: No refresh token")
    }
    return () => {
      setLoading(true)
    }
  }, [])

  // 4. Log in by POST-ing the email and password and get tokens in return
  // and call setAuthTokens with the result.
  const signin = async (payload: IAuthParams) => {
    const params = new URLSearchParams()
    params.append("username", payload.username)
    params.append("password", sha256(payload.password).toString())
    params.append("grant_type", "password")
    params.append("scope", "read,write")

    const response = await Axios.post(`${AUTH_API_URL}`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + Base64.btoa(`${AUTH_API_CLIENT_ID}:${AUTH_API_CLIENT_SECRET}`),
      },
      timeout: AUTH_API_TIMEOUT,
    })

    // save tokens to storage
    await setAuthTokens({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    })

    setSignin(true)
    setLoading(false)
  }

  // 5. Log out by clearing the auth tokens from AsyncStorage
  const signout = () => {
    clearAuthTokens()
    setSignin(false)
  }

  const joining = async (params: IUserModel) => {
    const userApi = new UserApi(api)
    await userApi.joining(params)
  }

  const withdraw = async () => {
    const userApi = new UserApi(api)
    await userApi.withdraw()
  }

  const refresh = async () => {
    const token = await getRefreshToken()
    const api = new AuthApi()
    await api.requestRefresh(token)
  }

  const findMe = async () => {
    // NOTE - API 구현 후 주석 제거
    // const userApi = new UserApi(api)
    // const result = await userApi.getMe()
    // if (result.kind === "ok") {
    // setUser(result.data)
    setUser({ id: 1, name: "test" } as IUserModel)
    // } else {
    //   setSignin(false)
    //   setLoading(false)
    // }
  }

  return (
    <AuthContext.Provider value={{ isSignin, signin, signout, joining, withdraw, refresh, user }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
