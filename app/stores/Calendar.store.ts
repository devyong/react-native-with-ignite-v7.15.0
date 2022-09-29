import { destroy, flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withEnvironment } from "./extensions"

import { ICalendarModel, CalendarModel, IPaginationModel, PaginationModel } from "../models"

import { CalendarApi } from "../services"

/**
 * Model description here for TypeScript hints.
 */
export const CalendarStore = types
  .model("Calendar")
  .props({
    items: types.array(CalendarModel),
    info: types.maybeNull(PaginationModel),
    current: types.maybeNull(types.reference(CalendarModel)),
    state: types.optional(types.enumeration("State", ["pending", "done", "error"]), "pending"),
  })
  .extend(withEnvironment)
  .views((self) => ({
    findById: function (id) {
      return self.items.find((item) => item.id === id)
    },
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

    function setInfo(info: IPaginationModel) {
      self.info ? self.info.setProps(info) : (self.info = info)
    }

    function setState(state: "pending" | "done" | "error") {
      self.state = state
    }

    return {
      select: setCurrent,

      listCalendar: flow(function* (params?: { [key: string]: any }) {
        setState("pending")
        const api = new CalendarApi(self.environment.api)
        const result = yield api.listCalendar(params)
        if (result.kind === "ok") {
          setItems(result.data)
          setInfo(result.info)
          setState("done")
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

      prev: flow(function* () {
        if (self.info?.prev) {
          setState("pending")
          const api = new CalendarApi(self.environment.api)
          const result = yield api.listCalendar(self.info.prev)
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
          const api = new CalendarApi(self.environment.api)
          const result = yield api.listCalendar(self.info.next)
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

export interface ICalendarModelStore extends Instance<typeof CalendarStore> {}
export interface ICalendarModelStoreSnapshotOut extends SnapshotOut<typeof CalendarStore> {}
export interface ICalendarModelStoreSnapshotIn extends SnapshotIn<typeof CalendarStore> {}
export const createCalendarStore = () => types.optional(CalendarStore, {})
