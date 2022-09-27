import { ApiBase } from "./api/api-base"

import { ILocation } from "../models/location/location"

export class LocationApi extends ApiBase {
    async listLocation() {
        return this.list<ILocation>("location")
      }
    
      async getLocation(id: number) {
        return this.get<ILocation>(`location/${id}`)
      }
    
      async postLocation(data: ILocation) {
        return this.post<ILocation>(`location`, data)
      }
    
      async putLocation(id: number, data: ILocation) {
        return this.put<ILocation>(`location/${id}`, data)
      }
    
      async patchLocation(id: number, data: ILocation) {
        return this.patch<ILocation>(`location/${id}`, data)
      }
    
      async deleteLocation(id: number) {
        return this.delete(`location/${id}`)
      }
}