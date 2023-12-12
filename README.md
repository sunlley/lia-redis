# Redis Installer
Simplify the use of Redis

![](https://img.shields.io/badge/version-1.0.0-lightgrey)
![](https://img.shields.io/badge/node-16.%2B-brightgreen)

## Installer
Using npm:
```shell
$ npm install lia-redis
```

## How to Use RedisInstaller
### 1.1 Redis Initial (single mode)
```typescript
import {RedisInstaller,RedisConfig} from "lia-redis";
const TARGET = {};
const config = {
    host: "127.0.0.1",
    port: 6379
}
const installer = new RedisInstaller(config,TARGET,'sys|info');
await installer.load();
```
### 1.2 Redis Use (single mode)

```typescript
await TARGET.REDIS.SET('KEY','Hello')
const result = await TARGET.REDIS.GET('KEY')
console.log(result);

```

### 2.1 Redis Initial (multi mode)

```typescript
import {RedisInstaller,RedisConfig,RedisConfigs} from "lia-redis";
const TARGET = {};
const config = {
    APP1:{
        host: "127.0.0.1",
        port: 6379
    }
}
const installer = new RedisInstaller(config,TARGET,'sys|info');
await installer.load();
```

### 2.2 Redis Use (multi mode)
The multi-instance mode is basically the same as the single-instance mode, except that the database instance needs to be specified on the REDIS instance, for example:
#### query
```typescript
await TARGET.REDIS.APP1.SET('KEY','Hello')
const result = await TARGET.REDIS.APP1.GET('KEY')
console.log(result);

```

For other operations, please refer to [redis](https://www.npmjs.com/package/redis)

