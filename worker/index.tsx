//@ts-nocheck

interface Env {
  ASSETS: Fetcher
}

export default {
  fetch(req, env): Promise<Response> {
    return env.ASSETS.fetch(req)
  },
} satisfies ExportedHandler<Env>
