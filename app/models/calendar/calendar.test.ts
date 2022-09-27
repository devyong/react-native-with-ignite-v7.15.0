import { CalendarModel } from "./calendar.model"

test("can be created", () => {
  const instance = CalendarModel.create({})

  expect(instance).toBeTruthy()
})
