declare global {
  namespace NodeJS {
    interface ProcessEnv {
      botToken: string;
      guildId: string;
      environment: 'debug' | 'dev' | 'prod';
    }
  }
}

export {}