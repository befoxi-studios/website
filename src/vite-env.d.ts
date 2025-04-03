/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RUNTIME_MODE: 'development' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
