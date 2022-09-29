import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

import { withEnvironment } from "./extensions"

import { CharacterApi } from "../services"

import { CharacterModel, ICharacterModel, IPaginationModel, PaginationModel } from "../models"

/**
 * Example store containing Rick and Morty characters
 */
export const CharacterStore = types
  .model("CharacterStore")
  .props({
    items: types.array(CharacterModel),
    info: types.maybeNull(PaginationModel),
    current: types.maybeNull(types.reference(CharacterModel)),
    state: types.optional(types.enumeration("State", ["pending", "done", "error"]), "pending"),
  })
  .extend(withEnvironment)
  .views((self) => ({
    findById: function (id) {
      return self.items.find((item) => item.id === id)
    },
  }))
  .actions((self) => {
    function setItems(characterSnapshots: ICharacterModel[]) {
      self.items.replace(characterSnapshots)
    }

    function setItem(characterSnapshot: ICharacterModel) {
      self.items.replace(
        self.items.map((character) => {
          if (character.id === characterSnapshot.id) {
            return characterSnapshot
          }
          return character
        }),
      )
    }

    function setCurrent(id: number | null) {
      self.current = id === null ? null : self.findById(id)
    }

    function setInfo(info: IPaginationModel) {
      self.info ? self.info.setProps(info) : (self.info = info)
    }

    function setState(state: "pending" | "done" | "error") {
      self.state = state
    }

    return {
      select: setCurrent,

      listCharacter: flow(function* (params?: { [key: string]: any }) {
        setState("pending")
        const api = new CharacterApi(self.environment.api)
        const result = yield api.listCharacter(params)
        if (result.kind === "ok") {
          setItems(result.data)
          setInfo(result.info)
          setState("done")
        } else {
          setState("error")
          console.tron.log(result.kind)
        }
      }),

      getCharacter: flow(function* (id: number) {
        const api = new CharacterApi(self.environment.api)
        const result = yield api.getCharacter(id)
        if (result.kind === "ok") {
          setItem(result.data)
          // setCurrent(result.data.id)
        } else {
          console.tron.log(result.kind)
        }
      }),

      prev: flow(function* () {
        if (self.info?.prev) {
          setState("pending")
          const api = new CharacterApi(self.environment.api)
          const result = yield api.listCharacter(self.info.prev)
          if (result.kind === "ok") {
            setItems(result.data)
            setInfo(result.info)
            setState("done")
          } else {
            setState("error")
            console.tron.log(result.kind)
          }
        }
      }),

      next: flow(function* () {
        if (self.info?.next) {
          setState("pending")
          const api = new CharacterApi(self.environment.api)
          const result = yield api.listCharacter(self.info.next)
          if (result.kind === "ok") {
            setItems(result.data)
            setInfo(result.info)
            setState("done")
          } else {
            setState("error")
            console.tron.log(result.kind)
          }
        }
      }),
    }
  })

export interface ICharacterStore extends Instance<typeof CharacterStore> {}
export interface ICharacterStoreSnapshotOut extends SnapshotOut<typeof CharacterStore> {}
export interface ICharacterStoreSnapshotIn extends SnapshotIn<typeof CharacterStore> {}
export const createCharacterStore = () => types.optional(CharacterStore, {})
