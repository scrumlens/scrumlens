declare module 'bun' {
  interface Env {
    API_PORT: string
    SECRET_KEY: string
    MONGO_URL: string
  }
}
