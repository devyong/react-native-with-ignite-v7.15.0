import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Rick and Morty character model.
 */
export const CharacterModel = types.model("Character").props({
  id: types.identifierNumber,
  name: types.maybe(types.string),
  species: types.maybe(types.string),
  type: types.maybe(types.string),
  gender: types.maybe(types.string),
  status: types.maybe(types.string),
  image: types.maybe(types.string),
  origin: types.maybe(types.frozen()),
  location: types.maybe(types.frozen()),
  episode: types.maybe(types.array(types.frozen())),
  url: types.maybe(types.string),
  created: types.maybe(types.string),
})

export interface ICharacterModel extends Instance<typeof CharacterModel> {}
export interface ICharacterSnapshotOut extends SnapshotOut<typeof CharacterModel> {}
export interface ICharacterSnapshotIn extends SnapshotIn<typeof CharacterModel> {}
export const createCharacterDefaultModel = () => types.optional(CharacterModel, {})
