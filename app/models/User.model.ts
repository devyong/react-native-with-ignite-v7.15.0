import { 
  applySnapshot, 
  getSnapshot, 
  Instance, 
  SnapshotIn, 
  SnapshotOut, 
  types 
} from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    id: types.identifierNumber,
    name: types.string,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setProps: (props: { [key: string]: any }) => {
      const newProps = { ...getSnapshot(self), ...props } as IUserModelSnapshotIn;
      applySnapshot(self, newProps);
    },
  })) 
  
export interface IUserModel extends Instance<typeof UserModel> {}
export interface IUserModelSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface IUserModelSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserModel = () => types.optional(UserModel, {})
