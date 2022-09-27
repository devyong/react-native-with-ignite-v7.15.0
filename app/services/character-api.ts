import { ICharacter } from "../models/character/character"
import { ApiBase } from "./api/api-base"

export class CharacterApi extends ApiBase {
  async getCharacters() {
    return this.list<ICharacter>("character")
  }

  async getCharacter(id: number) {
    return this.get<ICharacter>(`character/${id}`)
  }

  async postCharacter(data: ICharacter) {
    return this.post<ICharacter>(`character`, data)
  }

  async putCharacter(id: number, data: ICharacter) {
    return this.put<ICharacter>(`character/${id}`, data)
  }

  async patchCharacter(id: number, data: ICharacter) {
    return this.patch<ICharacter>(`character/${id}`, data)
  }

  async deleteCharacter(id: number) {
    return this.delete(`character/${id}`)
  }
}
