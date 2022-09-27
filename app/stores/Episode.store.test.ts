import { EpisodeStore } from "./Episode.store"

test("can be created", () => {
  const instance = EpisodeStore.create({})

  expect(instance).toBeTruthy()
})
