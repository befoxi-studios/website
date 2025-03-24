import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface GlobalState {
  isSearchOpen: boolean
  changeSearchState: (state: boolean) => void
}

export const useStore = create<GlobalState>()(
  devtools((set) => ({
    isSearchOpen: false,
    changeSearchState: state => set(() => ({ isSearchOpen: state })),
  }))
)
