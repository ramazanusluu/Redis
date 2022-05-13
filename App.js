import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6391",
});
client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();
//Set işlemi
const setislem = await client.set("test", "test");
console.log("Set: ", setislem);
//Get işlemi
const value = await client.get("key");
console.log("Get: ", value);

