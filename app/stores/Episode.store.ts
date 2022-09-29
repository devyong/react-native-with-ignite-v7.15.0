import { destroy, flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withEnvironment } from "./extensions"

import { IEpisodeModel, EpisodeModel, IPaginationModel, PaginationModel } from "../models"

import { EpisodeApi } from "../services"

/**
 * Model description here for TypeScript hints.
 */
export const EpisodeStore = types
  .model("Episode")
  .props({
    items: types.array(EpisodeModel),
    info: types.maybeNull(PaginationModel),
    current: types.maybeNull(types.reference(EpisodeModel)),
    state: types.optional(types.enumeration("State", ["pending", "done", "error"]), "pending"),
  })
  .extend(withEnvironment)
  .views((self) => ({
    findById: function (id) {
      return self.items.find((item) => item.id === id)
    },
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

    function setInfo(info: IPaginationModel) {
      self.info ? self.info.setProps(info) : (self.info = info)
    }

    function setState(state: "pending" | "done" | "error") {
      self.state = state
    }

    return {
      select: setCurrent,

      listEpisode: flow(function* (params?: { [key: string]: any }) {
        setState("pending")
        const api = new EpisodeApi(self.environment.api)
        const result = yield api.listEpisode(params)
        if (result.kind === "ok") {
          setItems(result.data)
          setInfo(result.info)
          setState("done")
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

      prev: flow(function* () {
        if (self.info?.prev) {
          setState("pending")
          const api = new EpisodeApi(self.environment.api)
          const result = yield api.listEpisode(self.info.prev)
          if (result.kind === "ok") {
            setItems(result.data)
            setInfo(result.info)
            setState("done")
          } else {
            setState("error")
            console.tron.log(result.kind)
          }
        }
      }),

      next: flow(function* () {
        if (self.info?.next) {
          setState("pending")
          const api = new EpisodeApi(self.environment.api)
          const result = yield api.listEpisode(self.info.next)
          if (result.kind === "ok") {
            setItems(result.data)
            setInfo(result.info)
            setState("done")
          } else {
            setState("error")
            console.tron.log(result.kind)
          }
        }
      }),
    }
  })

export interface IEpisodeModelStore extends Instance<typeof EpisodeStore> {}
export interface IEpisodeModelStoreSnapshotOut extends SnapshotOut<typeof EpisodeStore> {}
export interface IEpisodeModelStoreSnapshotIn extends SnapshotIn<typeof EpisodeStore> {}
export const createEpisodeStore = () => types.optional(EpisodeStore, {})
