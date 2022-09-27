import { CalendarStore } from "./Calendar.store"

test("can be created", () => {
  const instance = CalendarStore.create({})

  expect(instance).toBeTruthy()
})
