import { RedisOptions } from "ioredis"

interface ICacheConfig {
  driver: 'redis',

  config: {
    redis: RedisOptions
  }
}

export default {
  driver: 'redis',

  config: {
    redis:{
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_POR,
      password: process.env.REDIS_PASS
    },
  },
} as ICacheConfig
