import path, { format } from "node:path";

// Määritellään __dirname annetaan nimeksi JUURIPOLKU
const JUURIPOLKU = fileURLToPath(new URL(".", import.meta.url));

console.log(JUURIPOLKU);

// console.log(JUURIPOLKU);

//määtitellään require
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const asetukset = require("./varastot/jaatelovarasto/asetukset.json");
console.log(asetukset);

import { muunna } from "./varastot/jaatelovarasto/jaatelosovitin.js";
import { LukijaKirjoittaja } from "./varastokirja/lukijaKirjoittaja.js";

const varastotiedostopolku = path.join(
  JUURIPOLKU,
  "varastot",
  "jaatelovarasto",
  "jaatelot.json"
);

// const lukija=new LukijaKirjoittaja(muunna);
// lukija.lueVarasto(varastotiedostopolku).then(console.log);

import { LukijaKirjoittaja } from "./varastokirja/lukijaKirjoittaja.js";

const muunnin = (alkio) => alkio; // Example transformer function
const lukijaKirjoittaja = new LukijaKirjoittaja(muunnin);

(async () => {
  const data = await lukijaKirjoittaja.lueVarasto("example.json");
  console.log(data);
})();


const KIRJASTOT = {
  varastoconfig: asetukset,
  sovitin: muunna,
  varastofunktiot: { LukijaKirjoittaja },
  polut: {
    varastotiedostopolku,
    kuvakansiopolku: path.join(
      JUURIPOLKU,
      "varastot",
      "jaatelovarasto",
      "kuvat"
    ),
  },
};

console.log(KIRJASTOT);
const varasto = new Varastokerros(KIRJASTOT);
console.log(varasto.resurssi);
console.log(varasto.perusavain);
console.log(varasto.hakuavaimet);
varasto.haeKaikki().then(console.log);
varasto.hae("id", 1).then(console.log);
varasto.hae("hinta", 2).then(console.log);
varasto.haeAvaimet().then(console.log).catch(console.log);