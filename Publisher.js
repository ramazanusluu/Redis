import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6391",
});

client.on("error", (err) => console.log("Redis Client Error", err));
await client.connect();

const publisher = client.duplicate();
await publisher.connect();
await publisher.publish("channel", "vs code üzerinden yayımlanan mesaj");
