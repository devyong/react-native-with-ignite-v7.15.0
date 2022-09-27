import { destroy, Instance, SnapshotIn, SnapshotOut, types, flow } from "mobx-state-tree"

import { withEnvironment } from "./extensions/with-environment"
import { IEpisodeModel, EpisodeModel } from "../models/Episode.model"
import { EpisodeApi } from "../services/Episode.api"

/**
 * Model description here for TypeScript hints.
 */
export const EpisodeStore = types
  .model("Episode")
  .props({
    items: types.array(EpisodeModel),
    current: types.maybeNull(types.reference(EpisodeModel)),
    isLoading: true,
    state: types.optional(types.enumeration("State", ["pending", "done", "error"]), "pending"),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get list() {
      return self.isLoading ? self.items : []
    },

    findById: function (id) {
      return self.items.find((item) => item.id === id)
    }
  }))
  .actions((self) => {
    function setItems(items: IEpisodeModel[]) {
      self.items.replace(items)
    }

    function addItem(item: IEpisodeModel) {
      self.items.push(item)
    }

    function setItem(item: IEpisodeModel) {
      const existingItem = self.findById(item.id)
      if (existingItem) {
        existingItem.setProps(item)
      }
    }

    function removeItem(item: IEpisodeModel | number) {
      const id = typeof item === "number" ? item : item.id
      const existingItem = self.findById(id)
      if (existingItem) {
        destroy(existingItem)
      }
    }

    function setCurrent(id: number | null) {
      self.current = id === null ? null : self.findById(id)
    }
    
    function markLoading(loading: boolean) {
      self.isLoading = loading
    }

    function setState(state: "pending" | "done" | "error") {
      self.state = state
    }

    return {
      select: setCurrent,

      listEpisode: flow(function* () {
        setState("pending")
        const api = new EpisodeApi(self.environment.api)
        const result = yield api.listEpisode()
        if (result.kind === "ok") {
          setState("done")
          setItems(result.data)
          markLoading(false)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),

      getEpisode: flow(function* (id: number) {
        setState("pending")
        const api = new EpisodeApi(self.environment.api)
        const result = yield api.getEpisode(id)
        if (result.kind === "ok") {
          setState("done")
          setItem(result.data)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
      
      postEpisode: flow(function* (data: IEpisodeModel) {
        setState("pending")
        const api = new EpisodeApi(self.environment.api)
        const result = yield api.postEpisode(data)
        if (result.kind === "ok") {
          setState("done")
          addItem(result.data)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
      
      putEpisode: flow(function* (id: number, data: IEpisodeModel) {
        setState("pending")
        const api = new EpisodeApi(self.environment.api)
        const result = yield api.putEpisode(id, data)
        if (result.kind === "ok") {
          setState("done")
          setItem(result.data)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
      
      patchEpisode: flow(function* (id: number, data: IEpisodeModel) {
        setState("pending")
        const api = new EpisodeApi(self.environment.api)
        const result = yield api.patchEpisode(id, data)
        if (result.kind === "ok") {
          setState("done")
          setItem(result.data)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
      
      deleteEpisode: flow(function* (id: number) {
        setState("pending")
        const api = new EpisodeApi(self.environment.api)
        const result = yield api.deleteEpisode(id)
        if (result.kind === "ok") {
          setState("done")
          removeItem(id)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
    }
  })

export interface IEpisodeModelStore extends Instance<typeof EpisodeStore> {}
export interface IEpisodeModelStoreSnapshotOut extends SnapshotOut<typeof EpisodeStore> {}
export interface IEpisodeModelStoreSnapshotIn extends SnapshotIn<typeof EpisodeStore> {}
export const createEpisodeStoreDefaultStore = () => types.optional(EpisodeStore, {})
