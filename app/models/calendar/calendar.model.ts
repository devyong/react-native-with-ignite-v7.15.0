import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CalendarModel = types
  .model("Calendar")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICalendar extends Instance<typeof CalendarModel> {}
export interface ICalendarSnapshotOut extends SnapshotOut<typeof CalendarModel> {}
export interface ICalendarSnapshotIn extends SnapshotIn<typeof CalendarModel> {}
export const createCalendarDefaultModel = () => types.optional(CalendarModel, {})
