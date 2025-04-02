interface StorageReference {
  set: (key: string, value: string) => string | null
  get: (key: string) => string | null
  clear: () => void
  remove: (key: string) => void
}

const storage = (type: Storage, name: string): StorageReference => {
  return {
    set(key, value) {
      type.setItem(key, value)
      return type.getItem(key)
    },
    get(key) {
      const value = type.getItem(key)
      if (!value) {
        throw `"${key}" not find in ${name}Storage.`
      }
      return value
    },
    clear() {
      type.clear()
    },
    remove(key) {
      type.removeItem(key)
    },
  }
}

export const local: StorageReference = storage(localStorage, 'local')
export const session: StorageReference = storage(sessionStorage, 'session')
