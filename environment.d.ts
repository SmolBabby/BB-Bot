declare global {
  namespace NodeJS {
    interface ProcessEnv {
      botToken: string;
      clientId: string
    }
  }
}

export {}