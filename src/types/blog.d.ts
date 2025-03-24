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

type MDXContent = React.ComponentType<any> | null
type ModuleType = { content?: React.SetStateAction<MDXContent>, variables?: MetadataVariable}

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
