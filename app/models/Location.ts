import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const LocationModel = types
  .model("Location")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ILocation extends Instance<typeof LocationModel> {}
export interface ILocationSnapshotOut extends SnapshotOut<typeof LocationModel> {}
export interface ILocationSnapshotIn extends SnapshotIn<typeof LocationModel> {}
export const createLocationDefaultModel = () => types.optional(LocationModel, {})
