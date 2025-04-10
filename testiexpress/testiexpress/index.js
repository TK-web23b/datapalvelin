import path from "node:path";
import express from "express";

//määritellään juuripolku
import { fileURLToPath } from "node:url";
const JUURIPOLKU = fileURLToPath(new URL(".", import.meta.url));

const app = express();
const port = 3000;
const host = "localhost";

const valikkoPolku = path.join(JUURIPOLKU, "valikko.html");

app.use(express.static(path.join(JUURIPOLKU, "public")));

app.get("/", (req, res) => res.sendFile(valikkoPolku));

app.listen(port, host, () => console.log(`${host}:${port} palvelee...`));
