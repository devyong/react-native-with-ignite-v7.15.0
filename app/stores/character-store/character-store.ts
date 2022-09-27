import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { CharacterModel, ICharacterModel } from "../../models";
import { CharacterApi } from "../../services/character.api";
import { withEnvironment } from "../extensions/with-environment";

/**
 * Example store containing Rick and Morty characters
 */
export const CharacterStoreModel = types
  .model("CharacterStore")
  .props({
    items: types.array(CharacterModel),
    current: types.maybeNull(types.reference(CharacterModel)),
    state: types.optional(types.enumeration("State", ["pending", "done", "error"]), "pending"),
  })
  .extend(withEnvironment)
  .actions((self) => {

    function setCharacters(characterSnapshots: ICharacterModel[]) {
      self.items.replace(characterSnapshots)
    }

    function updateCharacter(characterSnapshot: ICharacterModel) {
      self.items.replace(
        self.items.map((character) => {
          if (character.id === characterSnapshot.id) {
            return characterSnapshot
          }
          return character
        }),
      )
    }

    function setState(state: "pending" | "done" | "error") {
      self.state = state
    }

    return {
      getCharacters: flow(function* () {
        setState("pending")
        const api = new CharacterApi(self.environment.api)
        const result = yield api.listCharacter()
        if (result.kind === "ok") {
          setState("done")
          setCharacters(result.data)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
      getCharacter: async (id: number) => {
        const api = new CharacterApi(self.environment.api)
        const result = await api.getCharacter(id)
        if (result.kind === "ok") {
          updateCharacter(result.data)
          self.current = result.data
        } else {
          console.tron.log(result.kind)
        }
      },
    }
  })

export interface ICharacterStore extends Instance<typeof CharacterStoreModel> {}
export interface ICharacterStoreSnapshotOut extends SnapshotOut<typeof CharacterStoreModel> {}
export interface ICharacterStoreSnapshotIn extends SnapshotIn<typeof CharacterStoreModel> {}
export const createCharacterStoreDefaultModel = () => types.optional(CharacterStoreModel, {})
