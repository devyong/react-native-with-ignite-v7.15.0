import {
  applySnapshot,
  getSnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const LocationModel = types
  .model("Location")
  .props({
    id: types.identifierNumber,
    name: types.string,
    created: types.maybe(types.string),
    dimension: types.maybe(types.string),
    residents: types.array(types.string),
    type: types.maybe(types.string),
    url: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setProps: (props: { [key: string]: any }) => {
      const newProps = { ...getSnapshot(self), ...props } as ILocationModelSnapshotIn
      applySnapshot(self, newProps)
    },
  }))

export interface ILocationModel extends Instance<typeof LocationModel> {}
export interface ILocationModelSnapshotOut extends SnapshotOut<typeof LocationModel> {}
export interface ILocationModelSnapshotIn extends SnapshotIn<typeof LocationModel> {}
export const createLocationModelDefaultModel = () => types.optional(LocationModel, {})
