import { EpisodeModel } from "./Episode.model"

test("can be created", () => {
  const instance = EpisodeModel.create({})

  expect(instance).toBeTruthy()
})
