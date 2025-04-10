import path from "node:path";
import http from 'node:http';

// määritellään __dirname annetaan nimeksi JUURIPOLKU
import { fileURLToPath } from "node:url";
const JUURIPOLKU = fileURLToPath(new URL(".", import.meta.url));

// console.log(JUURIPOLKU);
// määritellään reguire
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const asetukset = require("./varastot/jaatelovarasto/asetukset.json");
console.log(asetukset);

import { Muunnin } from "./varastokirjasto/datasovitin.js";
import { LukijaKirjoittaja } from "./varastokirjasto/lukijakirjoittaja.js";

const varastotiedostopolku = path.join(
  JUURIPOLKU,
  "varastot",
  "jaatelovarasto",
  "jaatelot.json"
);


//const lukija = new LukijaKirjoittaja(muunna);
//lukija.lueVarasto(varastotiedostopolku).then(console.log);

import { Varastokerros } from "./varastokirjasto/varastokerros.js";

const KIRJASTOT = {
  varastoconfig: asetukset,
  sovitin: Muunnin,
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

// console.log(varasto.resurssi);
// console.log(varasto.perusavain);
// console.log(varasto.hakuavaimet);
// varasto.hae('hinta',2).then(console.log);
// varasto.hae('id',1).then(console.log);
// varasto.haeAvaimet().then(console.log).catch(console.log);

kaynnistaPalvelin(KIRJASTOT);

function kaynnistaPalvelin( KIRJASTOT){
  const varasto=new Varastokerros(KIRJASTOT);

  const port=3000;

  const host='localhost';

  const palvelin=http.createServer(async(req, res)=>{
    const {pathname, searchParams}=
      new URL(`HTTP://${req.headers.host}${req.url}`);
    const reitti=decodeURIComponent(pathname);

    try{
      switch(reitti){
        case '/':lahetaJson(res, varasto.resurssi);
        case ``:
          return lahetaJson(res,await varasto.haeKaikki());

        case `/${varasto.resurssi}/avaimet`:
          return lahetaJson(res,await varasto.haeAvaimet());

        case `/${varasto.resurssi}/hakuavaimet`:
          return lahetaJson(res, varasto.hakuavaimet);

        case `/${varasto.resurssi}/perusavain`:
          return lahetaJson(res, varasto.perusavain);

        case `/${varasto.resurssi}/kuvalista`:
          return lahetaJson(res, await varasto.haeKuvalista);

        case`/${varasto.resurssi}/numeeriset`:
          return lahetaJson(res, varasto.numeeriset);

        case `/${varasto.resurssi}/kuvatyypit`:
          return lahetaJson(res, varasto.tuetutkuvatyypit);

        case `/${varasto.resurssi}/arvot`:
          const hakuavain = searchParams.get('avain');

          return lahetaJson(res, await varasto.haeArvot(hakuavain, Kertaalleen));

          if(hakuavain) {
            const Kertaalleen=searchParams.has('kertaalleen');
          }
            return lahetaVirheilmoitus(res, `hakuavainta 'avain' ei löydy`);

        case `/${varasto.resurssi}/ehdolla`:
          const avain=valitsehakuavain(searchParams, varasto.hakuavaimet);
          if(avain){
            const hakuarvo=searchParams.get(avain);
            return lahetaJson(res, await varasto.hae(avain,hakuarvo));

          }
          return lahetaVirheilmoitus(res,
            `hakuavain eo ole joukossa '${varasto.hakuavaimet}'`);


        deafault:
          lahetaVirheilmoitus(res,`Resursse${reitti} ei löydy`);

      }
    }

    catch(virhe){
      lahetaVirheilmoitus(res,virhe.message);
    }
});//palvelin loppuu

  palvelin.listen(port,host,()=>console.log(`${host}:${port} palvelee...`))

}//käynnistäpalvelin loppuu

function lahetaJson(res, JsonResururssi, statuskoodi=200){
  const JsonData=JSON.stringify(JsonResururssi);
  res.writeHead(statuskoodi,{
    'content-Type':'application/json',
    'Access-Control-Allow-Origin':'*'

  });
  res.end(jsonData);

}

function lahetaVirheilmoitus(res, viesti){
  lahetaJson(res,{Viesti, tyyppi:'Virhe'});
}
function valitsehakuavain(hakuParams, hakuavaimet){
  for(const avain of hakuavaimet){
    if(hakuParams.has(avain)){
      return avain;
    }
  }
  return null;
}

function lahetaKuva(res, kuvaresurssi){
  res.writeHead(200,{
    'content-type':kuvaresurssi.mime.tyyppu,
    'content-Length':Buffer.byteLength(kuvaresurssi.kuvadata,kuvaresurssi.mime.koodaus
    ),
    'Access-Control-Allow-Origin': '*'
  })
}

res.end(kuvaresurssi.kuvadata, kuvaresurssi.mime.koodaus);

varasto.haeArvot('hinta').then(console.log).catch(console.log);
varasto.haeKuva('mansikka.png').then(console.log).catch(console.log);