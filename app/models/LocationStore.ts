import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const LocationStoreModel = types
  .model("LocationStore")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ILocationStore extends Instance<typeof LocationStoreModel> {}
export interface ILocationStoreSnapshotOut extends SnapshotOut<typeof LocationStoreModel> {}
export interface ILocationStoreSnapshotIn extends SnapshotIn<typeof LocationStoreModel> {}
export const createLocationStoreDefaultModel = () => types.optional(LocationStoreModel, {})
