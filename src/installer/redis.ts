import BaseInstaller, {Cluster} from '../base/installer';
import {RedisConfig,RedisConfigs, RedisTarget} from "../types";
import {RedisClient as CustomRedisClient} from "../types/RedisClient";

import {createClient, RedisClientType} from 'redis';

declare global {
    var [key]: any;
    var REDIS:CustomRedisClient;
    var __REDIS_CACHE: any;
}

export class RedisInstaller extends BaseInstaller {
    private readonly configs: any;

    /**
     *
     * @param configs
     * @param target mysql
     * @param debug debug model
     */
    constructor(configs: RedisConfig | RedisConfigs<RedisConfig>,
                target: RedisTarget | null,
                debug: boolean | Cluster | string = false) {
        target = target ? target : global as RedisTarget;
        let mul = ((configs.host!=null && configs.port!=null) && configs.url!=null);
        console.log('constructor','configs',configs.constructor)
        console.log('constructor','multiple',configs instanceof RedisConfig)
        if (mul) {
            if (!target.REDIS) {
                target.REDIS = {} as CustomRedisClient;
            }
        }
        super('REDIS', target, debug, mul);
        this.configs = configs;

    }

    async install() {
        console.log('install','multiple',this.multiple)
        if (this.multiple) {
            for (const key in this.configs) {
                await this.createClient(this.configs[key], key);
            }
        } else {
            await this.createClient(this.configs);
        }
    }


    /**
     * @private
     * @param name
     */
    _matchName(name?: string | null) {
        if (!name) {
            // this.logInfo(`createClient[ default ]: option`, config);
            return null;

        } else {
            return name.toUpperCase();
            // this.logInfo(`createClient[ ${name} ]: option`, config);
        }
    }

    createClient(options: RedisConfig, name?: string | null): Promise<any> {
        const _this = this;
        name = this._matchName(name);
        const id = _this.randomStr();
        let config:any = options;
        return new Promise(async (resolve, reject) => {
            if (config.url) {
            } else {
                config.url = `redis://${config.host}:${config.port}`;
            }
            console.log("createClient",'config',config);

            const redis = createClient(config);
            redis.on('connect', () => {
                _this.logSys(`client[ ${id} ]: connect`);
            });
            redis.on('ready', () => {
                _this.logSys(`client[ ${id} ]: ready`);
                resolve(redis);
            });
            redis.on('reconnecting', () => {
                _this.logSys(`client[ ${id} ]: reconnecting`);
            });
            redis.on('drain', () => {
                _this.logSys(`client[ ${id} ]: drain`);
            });
            redis.on('data', (data: any) => {
                _this.logSys(`client[ ${id} ]: data`, data);
            });
            redis.on('ping-interval', (reply: any) => {
                _this.logSys(`client[ ${id} ]: ping-interval`, reply);
            });
            redis.on('end', () => {
                _this.logSys(`client[ ${id} ]: close`);
                redis.quit();
            });
            redis.on('error', (error: any) => {
                _this.logSys(`client[ ${id} ] : error`, error);
                redis.quit();
            });
            // let client = new CustomRedisClient(redis,id);
            // @ts-ignore
            // _this._target.REDIS[name] = redis;
            try {
                await redis.connect();
                if (name) {
                    _this._target.REDIS[name] = redis;
                } else {
                    _this._target.REDIS = redis;
                }
                resolve(redis);
            } catch (e) {
                reject(e);
            }
        })
    }

}
