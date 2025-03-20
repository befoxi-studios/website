export type v1 = {
  version: number
  file: {
    structure: string
    index: string
  }
  readme: {
    filename: string
    visible: boolean
    [code: string]: {
      filename: string
    }
  }
}