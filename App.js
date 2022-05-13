import { createClient } from "redis";

//get set gibi işelmleri yapabilmek için client üretmemiz gerekiyor
const client = createClient({
  url: "redis://localhost:6391",
  //defalult olarak 6379 portuna bağlanıyor. bunun için redis://localhost:6391 eklendi.
});

//client'ın bağlanmasında herhangi bir problem varsa on ile bu eventi alabiliyoruz.
client.on("error", (err) => console.log("Redis Client Error", err));
await client.connect();

//set işlemi
const setislemi = await client.set("test", "test");
console.log("Set: ", setislemi);

//get işlemi
const value = await client.get("key");
console.log("Get: ", value);

//del işlemi
const del = await client.del("test");
console.log("Del: ", del);

//exists işlemi
const exists = await client.exists("key");
console.log("Exists: ", exists);

//hSet işlemi
const hset = await client.hSet("user", "lastname", "Avcı");
console.log("hset : ", hset);

//hGetAll işlemi
const hgetall = await client.hGetAll("user");
console.log("hGetAll: ", hgetall);

//pub/sub işlemleri
const subscriber = client.duplicate();
await subscriber.connect();

await subscriber.subscribe("channel", (message) => {
  console.log(message);
});
