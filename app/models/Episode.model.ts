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
export const EpisodeModel = types
  .model("Episode")
  .props({
    id: types.identifierNumber,
    name: types.string,
    air_date: types.maybe(types.string),
    episode: types.maybe(types.string),
    created: types.maybe(types.string),
    characters: types.array(types.string),
    url: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setProps: (props: { [key: string]: any }) => {
      const newProps = { ...getSnapshot(self), ...props } as IEpisodeModelSnapshotIn
      applySnapshot(self, newProps)
    },
  }))

export interface IEpisodeModel extends Instance<typeof EpisodeModel> {}
export interface IEpisodeModelSnapshotOut extends SnapshotOut<typeof EpisodeModel> {}
export interface IEpisodeModelSnapshotIn extends SnapshotIn<typeof EpisodeModel> {}
export const createEpisodeModelDefaultModel = () => types.optional(EpisodeModel, {})
