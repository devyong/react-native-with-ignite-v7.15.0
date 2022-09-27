import { LocationModel } from "./Location.model"

test("can be created", () => {
  const instance = LocationModel.create({})

  expect(instance).toBeTruthy()
})
