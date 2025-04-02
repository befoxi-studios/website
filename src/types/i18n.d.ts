export type I18nData = {
  'lang-code'?: string
  langset: string
  load?: string[] | null
  set?: I18nSetType
}

export type I18nSetType = { [key: string]: any }
