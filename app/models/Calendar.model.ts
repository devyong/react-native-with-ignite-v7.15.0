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
export const CalendarModel = types
  .model("Calendar")
  .props({
    id: types.identifierNumber,
    name: types.string,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setProps: (props: { [key: string]: any }) => {
      const newProps = { ...getSnapshot(self), ...props } as ICalendarModelSnapshotIn
      applySnapshot(self, newProps)
    },
  }))

export interface ICalendarModel extends Instance<typeof CalendarModel> {}
export interface ICalendarModelSnapshotOut extends SnapshotOut<typeof CalendarModel> {}
export interface ICalendarModelSnapshotIn extends SnapshotIn<typeof CalendarModel> {}
export const createCalendarModelDefaultModel = () => types.optional(CalendarModel, {})
