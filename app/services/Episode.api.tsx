import { ApiBase } from "./api/api-base"

import { IEpisodeModel } from "../models/Episode.model"

export class EpisodeApi extends ApiBase {
  async listEpisode() {
    return this.list<IEpisodeModel>("episode")
  }

  async getEpisode(id: number) {
    return this.get<IEpisodeModel>(`episode/${id}`)
  }

  async postEpisode(data: IEpisodeModel) {
    return this.post<IEpisodeModel>(`episode`, data)
  }

  async putEpisode(id: number, data: IEpisodeModel) {
    return this.put<IEpisodeModel>(`episode/${id}`, data)
  }

  async patchEpisode(id: number, data: IEpisodeModel) {
    return this.patch<IEpisodeModel>(`episode/${id}`, data)
  }

  async deleteEpisode(id: number) {
    return this.delete(`episode/${id}`)
  }
}
