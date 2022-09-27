import { CharacterModel } from "./character.model"

test("can be created", () => {
  const instance = CharacterModel.create({
    id: 1,
    name: "Rick Sanchez",
  })

  expect(instance).toBeTruthy()
})
