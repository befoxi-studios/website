import type { MDXComponents, MDXContent } from '@/types/mdx'

export type v1 = {
  version: number
  file: {
    structure: string
    index: string
  }
  readme?: {
    filename: string
    visible: boolean
    [code: string]: {
      filename: string
    }
  }
}

export type ModuleType = {
  content?: React.SetStateAction<MDXContent>
  variables?: MetadataVariable
}

export interface Metadata {
  name: string
  variables: MetadataVariable | undefined
}

export type MetadataVariable = {
  name: string
  title: string
  description?: string
  category: string
  created: string
  icon?: string
  preview?: string
  [key: string]: any
}

export interface PostFrameProps {
  /** @deprecated */
  components?: MDXComponents
  uri: string
  onError?: () => any
}

export interface PostHeadProps extends React.HTMLAttributes<HTMLElement> {
  meta: Metadata | null
  delay?: number
}
