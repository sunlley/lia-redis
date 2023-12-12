import {RedisClientOptions} from "redis";

export class RedisConfig  implements RedisClientOptions{


    constructor(options:RedisClientOptions|any) {
        for (const optionsKey in options) {
            // @ts-ignore
            this[optionsKey]=options[optionsKey];
        }
    }

    /**
     * `redis[s]://[[username][:password]@][host][:port][/db-number]`
     * See [`redis`](https://www.iana.org/assignments/uri-schemes/prov/redis) and [`rediss`](https://www.iana.org/assignments/uri-schemes/prov/rediss) IANA registration for more details
     */
    url?: string;

    // password?: string;

    host?:string;

    port?:string|number;

    /**
     * Send `PING` command at interval (in ms).
     * Useful with Redis deployments that do not use TCP Keep-Alive.
     */
    pingInterval?: number;

    public static create(options:RedisConfig|any){
        return new RedisConfig(options);
    }

}
