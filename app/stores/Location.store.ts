import { destroy, Instance, SnapshotIn, SnapshotOut, types, flow } from "mobx-state-tree"

import { withEnvironment } from "./extensions/with-environment"
import { ILocationModel, LocationModel } from "../models/Location.model"
import { LocationApi } from "../services/Location.api"

/**
 * Model description here for TypeScript hints.
 */
export const LocationStore = types
  .model("Location")
  .props({
    items: types.array(LocationModel),
    current: types.maybeNull(types.reference(LocationModel)),
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
    function setItems(items: ILocationModel[]) {
      self.items.replace(items)
    }

    function addItem(item: ILocationModel) {
      self.items.push(item)
    }

    function setItem(item: ILocationModel) {
      const existingItem = self.findById(item.id)
      if (existingItem) {
        existingItem.setProps(item)
      }
    }

    function removeItem(item: ILocationModel | number) {
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

      listLocation: flow(function* () {
        setState("pending")
        const api = new LocationApi(self.environment.api)
        const result = yield api.listLocation()
        if (result.kind === "ok") {
          setState("done")
          setItems(result.data)
          markLoading(false)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),

      getLocation: flow(function* (id: number) {
        setState("pending")
        const api = new LocationApi(self.environment.api)
        const result = yield api.getLocation(id)
        if (result.kind === "ok") {
          setState("done")
          setItem(result.data)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
      
      postLocation: flow(function* (data: ILocationModel) {
        setState("pending")
        const api = new LocationApi(self.environment.api)
        const result = yield api.postLocation(data)
        if (result.kind === "ok") {
          setState("done")
          addItem(result.data)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
      
      putLocation: flow(function* (id: number, data: ILocationModel) {
        setState("pending")
        const api = new LocationApi(self.environment.api)
        const result = yield api.putLocation(id, data)
        if (result.kind === "ok") {
          setState("done")
          setItem(result.data)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
      
      patchLocation: flow(function* (id: number, data: ILocationModel) {
        setState("pending")
        const api = new LocationApi(self.environment.api)
        const result = yield api.patchLocation(id, data)
        if (result.kind === "ok") {
          setState("done")
          setItem(result.data)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
      
      deleteLocation: flow(function* (id: number) {
        setState("pending")
        const api = new LocationApi(self.environment.api)
        const result = yield api.deleteLocation(id)
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

export interface ILocationModelStore extends Instance<typeof LocationStore> {}
export interface ILocationModelStoreSnapshotOut extends SnapshotOut<typeof LocationStore> {}
export interface ILocationModelStoreSnapshotIn extends SnapshotIn<typeof LocationStore> {}
export const createLocationStoreDefaultStore = () => types.optional(LocationStore, {})
