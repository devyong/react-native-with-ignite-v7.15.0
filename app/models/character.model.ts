import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Rick and Morty character model.
 */
export const CharacterModel = types.model("Character").props({
  id: types.identifierNumber,
  name: types.maybe(types.string),
  status: types.maybe(types.string),
  image: types.maybe(types.string),
})

export interface ICharacterModel extends Instance<typeof CharacterModel> {}
export interface ICharacterSnapshotOut extends SnapshotOut<typeof CharacterModel> {}
export interface ICharacterSnapshotIn extends SnapshotIn<typeof CharacterModel> {}
export const createCharacterDefaultModel = () => types.optional(CharacterModel, {})
