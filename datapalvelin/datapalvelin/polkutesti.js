import config from'./config.json'with {type:'json'};


import { fileURLToPath } from "node:url";
const JUURIPOLKU = fileURLToPath(new URL(".", import.meta.url));
const varastoasetukset={
        "port":"3001",
        "host":"localhost",
        "varasto":{
            "kansio":"jaatelovarasto",
            "asetustiedosto":"asetukset.json",
            "varastotiedosto":"jaatelot.json",
            "kuvakansio":"kuvat"
    }
};

import { muodostaPolut } from './apukirjasto/muodostapolut.js';

console.log(muodostaPolut(JUURIPOLKU,config,varastoasetukset));