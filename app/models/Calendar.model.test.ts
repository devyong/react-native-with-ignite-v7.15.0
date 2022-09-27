import { CalendarModel } from "./Calendar.model"

test("can be created", () => {
  const instance = CalendarModel.create({})

  expect(instance).toBeTruthy()
})
