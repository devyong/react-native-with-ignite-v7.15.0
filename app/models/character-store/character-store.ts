import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { CharacterModel, ICharacterSnapshotOut } from "../character/character"
import { CharacterApi } from "../../services/character-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Example store containing Rick and Morty characters
 */
export const CharacterStoreModel = types
  .model("CharacterStore")
  .props({
    characters: types.array(CharacterModel),
    current: types.maybeNull(types.reference(CharacterModel)),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setCharacters: (characterSnapshots: ICharacterSnapshotOut[]) => {
      self.characters.replace(characterSnapshots)
    },
    updateCharacter: (characterSnapshot: ICharacterSnapshotOut) => {
      self.characters.replace(
        self.characters.map((character) => {
          if (character.id === characterSnapshot.id) {
            return characterSnapshot
          }
          return character
        }),
      )
    },
  }))
  .actions((self) => ({
    getCharacters: async () => {
      const characterApi = new CharacterApi(self.environment.api)
      const result = await characterApi.getCharacters()
      if (result.kind === "ok") {
        self.setCharacters(result.data)
      } else {
        console.tron.log(result.kind)
      }
    },
    getCharacter: async (id: number) => {
      const characterApi = new CharacterApi(self.environment.api)
      const result = await characterApi.getCharacter(id)
      if (result.kind === "ok") {
        self.updateCharacter(result.data)
        self.current = result.data
      } else {
        console.tron.log(result.kind)
      }
    },
  }))

export interface ICharacterStore extends Instance<typeof CharacterStoreModel> {}
export interface ICharacterStoreSnapshotOut extends SnapshotOut<typeof CharacterStoreModel> {}
export interface ICharacterStoreSnapshotIn extends SnapshotIn<typeof CharacterStoreModel> {}
export const createCharacterStoreDefaultModel = () => types.optional(CharacterStoreModel, {})
