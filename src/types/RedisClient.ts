import {RedisClientType} from "redis";

export type RedisClient = RedisClientType & Record<any, RedisClientType>;
// export class RedisClient {
//     client:RedisClientType;
//     id?:string;
//
//     constructor(client: RedisClientType,id?:string) {
//         this.client = client;
//         this.id=id?id:this.randomStr();
//         this.bindCommands();
//     }
//
//     protected randomStr(length = 10) {
//         let e = '';
//         for (let n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890', o = 0;
//              o < length; o++) {
//             e += n.charAt(Math.floor(Math.random() * n.length));
//         }
//         return e;
//     }
//
//     bindCommands() {
//         for (const command in COMMANDS) {
//             let commandValue = COMMANDS[command];
//             const method = (...args: any) => {
//                 return new Promise(async (resolve, reject) => {
//                     try {
//                         // @ts-ignore
//                         let result = await this.client[commandValue](...args);
//                         resolve(result);
//                     } catch (error) {
//                         reject(error);
//                     }
//                 })
//             }
//             // @ts-ignore
//             this.client[command]=method;
//         }
//     }
//
// }
