import {TEST_CONFIG} from "./config";
import {RedisInstaller} from "../src";
import {RedisConfig} from "../src/types";
const delay = (time=1000) => {
  return new Promise((resolve, reject)=>{
      setTimeout(()=>{resolve(true)},time)
  })
}
const test = async () => {
    let target: any = {};
    // let installer = await new RedisInstaller(RedisConfig.create(TEST_CONFIG.redis), target, 'all').load();
    let installer = await new RedisInstaller(TEST_CONFIG.redis, target, 'all').load();
    // await delay();
    let result = await target.REDIS.HGET('BEEPAY:PRICE:CNY','USDT');
    console.log('result', result);
}
// testOrigin()
test()
