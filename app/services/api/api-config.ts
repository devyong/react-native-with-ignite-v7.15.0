// Use this import if you want to use "env.js" file
const { API_URL, API_TIMEOUT } = require("../../config/env")

/**
 * The options used to configure the API.
 */
export interface IApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: IApiConfig = {
  url: API_URL,
  timeout: API_TIMEOUT,
}
