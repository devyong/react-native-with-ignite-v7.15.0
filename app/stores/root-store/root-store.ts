import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CalendarStore } from "../Calendar.store"
import { CharacterStore } from "../character-store"
import { EpisodeStore } from "../Episode.store"
import { LocationStore } from "../Location.store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStore, {} as any),
  locationStore: types.optional(LocationStore, {} as any),
  episodeStore: types.optional(EpisodeStore, {} as any),
  calendarStore: types.optional(CalendarStore, {} as any),
})

/**
 * The RootStore instance.
 */
export interface IRootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface IRootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
