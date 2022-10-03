import { ApisauceInstance, create } from "apisauce"
import { DEFAULT_API_CONFIG, IApiConfig } from "./api-config"

import { TokenRefreshRequest, applyAuthTokenInterceptor } from "react-native-axios-jwt"
import Axios, { AxiosInstance } from "axios"

const { AUTH_API_URL, AUTH_API_TIMEOUT } = require("../../config/env")

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * The underlying axios instance which performs the requests.
   * The api used to setup the apisauce.
   */
  axios: AxiosInstance

  /**
   * Configurable options.
   */
  config: IApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: IApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // // construct the apisauce instance
    // this.apisauce = create({
    //   baseURL: this.config.url,
    //   timeout: this.config.timeout,
    //   headers: {
    //     Accept: "application/json",
    //   },
    // })

    // jwt를 적용한 axios인스턴스를 사용하여 apisauce 인스턴스를 생성한다.
    // How do I use react-native-axios-jwt?
    // ------------------------------------
    // 1. Create an axios instance
    // 2. Define a token refresh function
    // 3. Configure the interceptor
    // 4. Store tokens on login with setAuthTokens()
    // 5. Clear tokens on logout with clearAuthTokens()

    // 1. Create an axios instance
    this.axios = Axios.create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: { Accept: "application/json" },
    })

    // 2. Define a token refresh function
    const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<string> => {
      // Important! Do NOT use the axios instance that you supplied to applyAuthTokenInterceptor
      // because this will result in an infinite loop when trying to refresh the token.
      // Use the global axios client or a different instance
      const response = await Axios.post(`${AUTH_API_URL}/auth/refresh_token`, {
        token: refreshToken,
        timeout: AUTH_API_TIMEOUT,
      })
      return response.data.access_token
    }

    // 3. Configure the interceptor
    applyAuthTokenInterceptor(this.axios, {
      requestRefresh, // async function that takes a refreshToken and returns a promise the resolves in a fresh accessToken
      header: "Authorization", // header name
      headerPrefix: "Bearer ", // header value prefix
    })

    // 4., 5. are implemented in app/context/Auth.provider.ts

    // Create apisauce instance with axios instance
    this.apisauce = create({ axiosInstance: this.axios, baseURL: this.config.url })
    
  }
}
