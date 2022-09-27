import { ApiBase } from "./api/api-base"

import { ILocationModel } from "../models/Location.model"

export class LocationApi extends ApiBase {
  async listLocation() {
    return this.list<ILocationModel>("location")
  }

  async getLocation(id: number) {
    return this.get<ILocationModel>(`location/${id}`)
  }

  async postLocation(data: ILocationModel) {
    return this.post<ILocationModel>(`location`, data)
  }

  async putLocation(id: number, data: ILocationModel) {
    return this.put<ILocationModel>(`location/${id}`, data)
  }

  async patchLocation(id: number, data: ILocationModel) {
    return this.patch<ILocationModel>(`location/${id}`, data)
  }

  async deleteLocation(id: number) {
    return this.delete(`location/${id}`)
  }
}
