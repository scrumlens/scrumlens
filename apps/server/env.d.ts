declare module 'bun' {
  interface Env {
    API_PORT: string
    CLIENT_URL: string
    EMAIL_DOMAIN: string
    MONGO_URL: string
    RESEND_API_KEY: string
    SECRET_KEY: string
  }
}
