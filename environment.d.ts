declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test'
            BALL_DONT_LIE_API_KEY: string
        }
    }
}