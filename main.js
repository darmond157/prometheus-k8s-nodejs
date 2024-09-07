require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const client = require('prom-client');

const counter = new client.Counter({
	name: "api_requests_count",
	help: "counting requests to the api",
});

fastify.get("/ping", (req, res) => {
	counter.inc();
	res.send("pong");
});

fastify.get("/metrics", async (req, res) => {
	res.header("Content-Type", client.register.contentType);
	res.send(await client.register.metrics());
});

fastify.listen({ port: process.env.PORT, host: process.env.HOST });
