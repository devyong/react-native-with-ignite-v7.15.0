import { LocationStore } from "./Location.store"

test("can be created", () => {
  const instance = LocationStore.create({})

  expect(instance).toBeTruthy()
})
