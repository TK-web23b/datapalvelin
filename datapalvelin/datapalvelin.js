import http from 'node:http';
import path from 'node:path';

// määritellään juuri polku
import { fileURLToPath } from 'node:url';
const JUURIPOLKU = fileURLToPath(new URL(".", import.meta.url));

const urlpolku = polku => new URL(`file://${JUURIPOLKU}/${polku}`);

import config from './config.json' with { type: 'json' };
import { type } from 'node:os';

const apukirjastokansio = path.join(JUURIPOLKU, config.apukirjasto.kansio);
const { luekomentorivi } = await import(urlpolku(path.join(apukirjastokansio, config.apukirjasto.luekomentorivi)));

const { muodostaPolut } = await import(urlpolku(path.join(apukirjastokansio, config.apukirjasto.muodostaPolut)));

const { muodostaKirjastot } = await import(urlpolku(path.join(apukirjastokansio, config.apukirjasto.muodostaKirjastot)));

// datapalvelinpolut
const palvelinkirjastokansio = path.join(JUURIPOLKU, config.palvelinkirjasto.kansio);
const palvelinfunktiopolku = path.join(palvelinkirjastokansio, config.palvelinkirjasto.palvelinfunktio);
const { default:Palvelin } = await import(urlpolku(palvelinfunktiopolku));

try {
    const varastoNimi = await luekomentorivi();
    const asetuspolku=
    path.join(JUURIPOLKU,config.varastot.kansio,
        varastoNimi,config.varastot.asetustiedostokansio);
    const varastoasetuksetpolku=
        urlopolku(path.join(asetuspolku,varastoNimi));
    
    try{
        const varastoasetukset=
    await import(varastoasetuksetpolku, {with:{type}});
    const polut=muodostaPolut(JUURIPOLKU,config,varastoasetukset.default);

    //console.log(polut);
    const kirjastot=await muodostaKirjastot(polut);
    kirjastot.varastoasetukset=varastoasetukset.default;

    function käynnistäpalvelin(kirjastot){
        const {tietovarasto}=kirjastot.tietovarasto;
        const varasto=new tietovarasto(kirjastot);
    }


    } 

    catch (tiedostovirhe) {
    console.log(tiedostovirhe);
    console.log(`asetustiedostoa ${varastoNmi} ei löydy`);

    }
}

catch (virhe) {
    console.log("Virhe:");
}


