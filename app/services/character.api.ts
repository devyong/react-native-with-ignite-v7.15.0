import { ApiBase } from "./api/api-base"

import { ICharacterModel } from "./../models/character.model"

export class CharacterApi extends ApiBase {
  async listCharacter(params?: string | { [key: string]: any }) {
    if (typeof params === "string") {
      return this.list<ICharacterModel>(params)
    }
    return this.list<ICharacterModel>("character", params)
  }

  async getCharacter(id: number) {
    return this.get<ICharacterModel>(`character/${id}`)
  }

  async postCharacter(data: ICharacterModel) {
    return this.post<ICharacterModel>(`character`, data)
  }

  async putCharacter(id: number, data: ICharacterModel) {
    return this.put<ICharacterModel>(`character/${id}`, data)
  }

  async patchCharacter(id: number, data: ICharacterModel) {
    return this.patch<ICharacterModel>(`character/${id}`, data)
  }

  async deleteCharacter(id: number) {
    return this.delete(`character/${id}`)
  }
}
