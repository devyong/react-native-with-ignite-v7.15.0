import { destroy, Instance, SnapshotIn, SnapshotOut, types, flow } from "mobx-state-tree"

import { withEnvironment } from "./extensions/with-environment"
import { ICalendarModel, CalendarModel } from "../models/Calendar.model"
import { CalendarApi } from "../services/Calendar.api"

/**
 * Model description here for TypeScript hints.
 */
export const CalendarStore = types
  .model("Calendar")
  .props({
    items: types.array(CalendarModel),
    current: types.maybeNull(types.reference(CalendarModel)),
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
    function setItems(items: ICalendarModel[]) {
      self.items.replace(items)
    }

    function addItem(item: ICalendarModel) {
      self.items.push(item)
    }

    function setItem(item: ICalendarModel) {
      const existingItem = self.findById(item.id)
      if (existingItem) {
        existingItem.setProps(item)
      }
    }

    function removeItem(item: ICalendarModel | number) {
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

      listCalendar: flow(function* () {
        setState("pending")
        const api = new CalendarApi(self.environment.api)
        const result = yield api.listCalendar()
        if (result.kind === "ok") {
          setState("done")
          setItems(result.data)
          markLoading(false)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),

      getCalendar: flow(function* (id: number) {
        setState("pending")
        const api = new CalendarApi(self.environment.api)
        const result = yield api.getCalendar(id)
        if (result.kind === "ok") {
          setState("done")
          setItem(result.data)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
      
      postCalendar: flow(function* (data: ICalendarModel) {
        setState("pending")
        const api = new CalendarApi(self.environment.api)
        const result = yield api.postCalendar(data)
        if (result.kind === "ok") {
          setState("done")
          addItem(result.data)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
      
      putCalendar: flow(function* (id: number, data: ICalendarModel) {
        setState("pending")
        const api = new CalendarApi(self.environment.api)
        const result = yield api.putCalendar(id, data)
        if (result.kind === "ok") {
          setState("done")
          setItem(result.data)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
      
      patchCalendar: flow(function* (id: number, data: ICalendarModel) {
        setState("pending")
        const api = new CalendarApi(self.environment.api)
        const result = yield api.patchCalendar(id, data)
        if (result.kind === "ok") {
          setState("done")
          setItem(result.data)
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),
      
      deleteCalendar: flow(function* (id: number) {
        setState("pending")
        const api = new CalendarApi(self.environment.api)
        const result = yield api.deleteCalendar(id)
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

export interface ICalendarModelStore extends Instance<typeof CalendarStore> {}
export interface ICalendarModelStoreSnapshotOut extends SnapshotOut<typeof CalendarStore> {}
export interface ICalendarModelStoreSnapshotIn extends SnapshotIn<typeof CalendarStore> {}
export const createCalendarStoreDefaultStore = () => types.optional(CalendarStore, {})
