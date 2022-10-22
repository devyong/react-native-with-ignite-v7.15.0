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
export const PaginationModel = types
  .model("Pagination")
  .props({
    count: 0,
    pages: 0,
    next: "",
    prev: "",
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setProps: (props: { [key: string]: any }) => {
      const newProps = { ...getSnapshot(self), ...props } as IPaginationModelSnapshotIn
      applySnapshot(self, newProps)
    },
  }))

export interface IPaginationModel extends Instance<typeof PaginationModel> {}
export interface IPaginationModelSnapshotOut extends SnapshotOut<typeof PaginationModel> {}
export interface IPaginationModelSnapshotIn extends SnapshotIn<typeof PaginationModel> {}
export const createPaginationDefaultModel = () => types.optional(PaginationModel, {})
