import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface GlobalState {
  langCode: string
  setLanguageCode: (code: string) => void
  isSearchOpen: boolean
  changeSearchState: (state: boolean) => void
}

export const useGlobal = create<GlobalState>()(
  devtools((set) => ({
    langCode: 'en',
    setLanguageCode: code => set(() => ({ langCode: code })),
    isSearchOpen: false,
    changeSearchState: state => set(() => ({ isSearchOpen: state })),
  }))
)
