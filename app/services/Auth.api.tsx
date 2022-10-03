import { Api, AUTH_API_CONFIG } from "./api"

import { IAuthModel } from "../models/Auth.model"

export class AuthApi {

  api: Api
  
  constructor() {
    this.api = new Api(AUTH_API_CONFIG)
    this.api.setup()
  }

  async login(data: IAuthModel) {
    return this.api.apisauce.post("/login", data)
  }

  async register(data: IAuthModel) {
    return this.api.apisauce.post("/register", data)
  }

  async logout() {
    return this.api.apisauce.post("/logout")
  }

  async forgotPassword(data: IAuthModel) {
    return this.api.apisauce.post("/forgot-password", data)
  }

  async resetPassword(data: IAuthModel) {
    return this.api.apisauce.post("/reset-password", data)
  }

  async verifyEmail(data: IAuthModel) {
    return this.api.apisauce.post("/verify-email", data)
  }

  async resendVerificationEmail(data: IAuthModel) {
    return this.api.apisauce.post("/resend-verification-email", data)
  }

  async changePassword(data: IAuthModel) {
    return this.api.apisauce.post("/change-password", data)
  }

  async updateProfile(data: IAuthModel) {
    return this.api.apisauce.post("/update-profile", data)
  }

  async updateEmail(data: IAuthModel) {
    return this.api.apisauce.post("/update-email", data)
  }

}