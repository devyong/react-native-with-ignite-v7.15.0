import { CharacterStore } from "./character-store"

test("can be created", () => {
  const instance = CharacterStore.create({})

  expect(instance).toBeTruthy()
})
