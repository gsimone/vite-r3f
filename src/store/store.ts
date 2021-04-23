import create, { State, StateCreator } from 'zustand'
import produce, { Draft } from 'immer'

// Immer V9
const immer = <T extends State>( config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void> ): StateCreator<T> => (set, get, api) => config((fn) => set(produce<T>(fn)), get, api)

const useStore = create(
  immer((set) => ({
    test: 123,
  })),
)

export default useStore