import http from 'node:http'; // node datapalvelin autovarasto Tollakomennolla toimii sivu!!! muistutukseksi
import path from 'node:path';

import { fileURLToPath } from 'node:url';
const JUURIPOLKU = fileURLToPath(new URL('.', import.meta.url));

const urlpolku = polku=> new URL(`file://${polku}`);

import config from './config.json' with {type: 'json'};

const apukirjastoKansio=path.join(JUURIPOLKU, config.apukirjasto.kansio);
const {lueKomentorivi}=await import(urlpolku(path.join(apukirjastoKansio, config.apukirjasto.luekomentorivi)));

const {muodostaPolut}=await import(urlpolku(path.join(apukirjastoKansio, config.apukirjasto.muodostapolut)));

const {muodostaKirjastot}=await import(urlpolku(path.join(apukirjastoKansio, config.apukirjasto.muodostakirjastot)));


const palvelinkirjastoKansio=path.join(JUURIPOLKU, config.palvelinkirjasto.kansio);
const palvelinfunktiotPolku=path.join(palvelinkirjastoKansio, config.palvelinkirjasto.palvelinfunktiot);

const {default:Palvelin}=await import(urlpolku(palvelinfunktiotPolku));

    try{
    const varastonNimi= await lueKomentorivi();
    const asetuspolku=path.join(JUURIPOLKU, config.varastot.kansio, config.varastot.asetustiedostotkansio);
    const varastoasetuksetPolku=urlpolku(path.join(asetuspolku, varastonNimi));
    


    try {
    const varastoasetukset=await import(varastoasetuksetPolku, { with: {type: 'json'}});
    const polut=muodostaPolut(JUURIPOLKU,config,varastoasetukset.default);

    console.log(polut);
    const KIRJASTOT=await muodostaKirjastot(polut);
    KIRJASTOT.varastoasetukset=varastoasetukset.default;
    
    console.log(KIRJASTOT);
    kaynnistaPalvelin(KIRJASTOT);
    }
    catch(tiedostovirhe){
    console.log(`asetustiedostoa ${varastonNimi} ei löytynyt`);
    }
}

catch(virhe){
    console.log(virhe);
}

function kaynnistaPalvelin(KIRJASTOT){
    
    const {Tietovarasto}=KIRJASTOT.tietovarasto;

    const varasto=new Tietovarasto(KIRJASTOT);

    const {port,host}=KIRJASTOT.varastoasetukset;

   

  const palvelin=http.createServer(async (req, res)=>{
    const {pathname, searchParams} = new URL(`http://${req.headers.host}${req.url}`);
    const reitti = decodeURIComponent(pathname);

    try{
      switch(reitti){
        case '/':return Palvelin.lahetaJson(res, varasto.resurssi);

        case `/${varasto.resurssi}`:
          return Palvelin.lahetaJson(res, await varasto.haeKaikki());

        case `/${varasto.resurssi}/avaimet`:
          return Palvelin.lahetaJson(res, await varasto.haeAvaimet());

        case `/${varasto.resurssi}/hakuavaimet`:
          return Palvelin.lahetaJson(res, varasto.hakuavaimet);

        case `/${varasto.resurssi}/perusavain`:
          return Palvelin.lahetaJson(res, varasto.perusavain);

        case `/${varasto.resurssi}/kuvalista`:
          return Palvelin.lahetaJson(res, await varasto.haeKuvalista());

        case `/${varasto.resurssi}/numeeriset`:
          return Palvelin.lahetaJson(res, varasto.numeeriset);

        case `/${varasto.resurssi}/kuvatyypit`:
          return Palvelin.lahetaJson(res, varasto.tuetutKuvatyypit);

        case `/${varasto.resurssi}/kuvakansio`:
          return Palvelin.lahetaJson(res, varasto.kuvakansio);

        case `/${varasto.resurssi}/arvot`:
          const hakuavain= searchParams.get('avain');
          if (hakuavain){
            const kertaalleen= searchParams.has('kertaalleen');
            return Palvelin.lahetaJson(res, await varasto.haeArvot(hakuavain, kertaalleen));
          }
          return Palvelin.lahetaVirheilmoitus(res, `hakuavainta 'avain' ei löytynyt`);
          
        case `/${varasto.resurssi}/ehdolla`:
          const avain= Palvelin.valitsehakuavain(searchParams, varasto.hakuavaimet);
          if(avain){
            const hakuarvo= searchParams.get(avain);
            return Palvelin.lahetaJson(res, await varasto.hae(avain, hakuarvo));
          }
          return Palvelin.lahetaVirheilmoitus(res, `Hakuavain ei ole joukossa'${varasto.hakuavaimet}'`);

        case `/${varasto.resurssi}/kuvat`:
          const nimi =searchParams.get('nimi');
          if(nimi){
            const kuva= await varasto.haeKuva(nimi);
            if(kuva && kuva.kuvaData){
              return Palvelin.lahetaKuva(res, kuva);
            }
          }
          res.statusCode=404;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end();
          break;

        default:
          Palvelin.lahetaVirheilmoitus(res, `Resurssia ${reitti} ei löytynyt`);
      }
    }
    catch(virhe){
      Palvelin.lahetaVirheilmoitus(res, virhe.message);
    }

  }); //palvelmen loppu
  palvelin.listen(port, host, ()=>console.log(`${host}:${port} palvelee...`))};