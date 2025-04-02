import { useGlobal } from '@/hooks/useGlobal'
import { FILES_OF_I18N_DEFAULT, FILES_OF_I18N } from '@/utils/files'
import type { I18nData, I18nSetType } from '@/types/i18n'

const codeRegex = new RegExp(/\.{2}\/submodules\/i18n\/(\w+)\/.+\.ya?ml/)

const parseFile = (imported: Record<string, unknown>) => {
  return Object
    .entries(imported)
    .map(([path, mod]: [path: string, mod: any]) => ([path, mod]))
}

const getLoader = (load: string[] | null | undefined, code: string) => {
  const loaders = load?.flatMap(loadName => {
    const loaderRegex = new RegExp(`../submodules/i18n/${code}/${loadName}`)
    const loader = Object.entries(FILES_OF_I18N).filter(([path]) => loaderRegex.test(path))
    return loader.map(([_, mod]: [path: string, mod: any]) => mod.default)
  })
  const flatLoader = loaders?.reduce((acc, cur) => ({ ...acc, ...cur }), {})
  return flatLoader
}

const getTranslate = (props: I18nSetType, key: string, defaultValue?: string, useLog: boolean = false): string | undefined => {
  const prop = props[key]
  if (useLog) {
    console.log(`[be:i18n/t] { input: ${key}, output: ${prop || defaultValue || '""'} }`)
  }
  if (prop) {
    return prop
  } else {
    return defaultValue
  }
}

export const useI18n = () => {
  const { langCode, setLanguageCode } = useGlobal()
  
  const datas = parseFile(FILES_OF_I18N_DEFAULT).map(([path, mod]): I18nData => {
    const locale = path.replace(codeRegex, '$1')
    const data: I18nData = mod.default
    const load = data.load

    return {
      'lang-code': locale,
      langset: data.langset,
      set: {
        ...getLoader(load, locale),
        ...data.set,
      }
    }
  })
  const props = datas.filter(({ 'lang-code': locale }) => langCode === locale)[0]

  return {
    datas,
    /** @example t("hello", "Hello World!") */
    t: (key: string, defaultValue?: string) => getTranslate(props.set!, key, defaultValue),
    /** @description for debuging */
    td: (key: string, defaultValue?: string) => getTranslate(props.set!, key, defaultValue, true),
    currentLanguage: langCode,
    setLanguage: setLanguageCode,
  }
}
