import http from 'node:http';
import path from 'node:path';

// Määritellään juuripolku
import { fileURLToPath } from 'node:url';
const JUURIPOLKU = fileURLToPath(new URL(".", import.meta.url));

const urlpolku = polku => new URL(`file://${JUURIPOLKU}/${polku}`);

import config from './config.json' with { type: 'json' };
import { type } from 'node:os';

const apukirjastokansio = path.join(JUURIPOLKU, config.apukirjasto.kansio);
const { luekomentorivi } = await import(urlpolku(path.join(apukirjastokansio, config.apukirjasto.luekomentorivi)));

const { muodostaPolut } = await import(urlpolku(path.join(apukirjastokansio, config.apukirjasto.muodostaPolut)));

const { muodostaKirjastot } = await import(urlpolku(path.join(apukirjastokansio, config.apukirjasto.muodostaKirjastot)));

// Datapalvelinpolut
const palvelinkirjastokansio = path.join(JUURIPOLKU, config.palvelinkirjasto.kansio);
const palvelinfunktiopolku = path.join(palvelinkirjastokansio, config.palvelinkirjasto.palvelinfunktio);
const { default: Palvelin } = await import(urlpolku(palvelinfunktiopolku));

try {
    const varastoNimi = await luekomentorivi();
    const asetuspolku = path.join(JUURIPOLKU, config.varastot.kansio, varastoNimi, config.varastot.asetustiedostokansio);
    const varastoasetuksetpolku = urlpolku(path.join(asetuspolku, varastoNimi));

    try {
        const varastoasetukset = await import(varastoasetuksetpolku, { with: { type } });
        const polut = muodostaPolut(JUURIPOLKU, config, varastoasetukset.default);

        // Konsoliin tulostus debuggaukseen
        console.log(polut);

        const kirjastot = await muodostaKirjastot(polut);
        kirjastot.varastoasetukset = varastoasetukset.default;

        console.log(kirjastot);
        käynnistäPalvelin(kirjastot);

        function käynnistäPalvelin(kirjastot) {
            const { tietovarasto } = kirjastot.tietovarasto;
            const varasto = new tietovarasto(kirjastot);

            const { port, host } = kirjastot.varastoasetukset;
            const palvelin = http.createServer(async (req, res) => {
                const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
                const reitti = decodeURIComponent(pathname).toLowerCase();

                try {
                    switch (reitti) {
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
                            return Palvelin.lahetaJson(res, varasto.tuettukuvat);

                        case `/${varasto.resurssi}/kuvakansio`:
                            return Palvelin.lahetaJson(res, varasto.kuvakansio);

                        case `/${varasto.resurssi}/arvot`:
                            const hakusana = searchParams.get("avain");
                            if (hakusana) {
                                const kertaalleen = searchParams.has("kertaalleen");
                                return Palvelin.lahetaJson(res, await varasto.haeArvo(hakusana, kertaalleen));
                            }
                            return Palvelin.lahetaVirheilmoitus(res, "Hakusana 'avain' puuttuu.");

                        case `/${varasto.resurssi}/ehdolla`:
                            const avain = Palvelin.valitseHakukriteeri(searchParams, varasto.hakuavaimet);
                            if (avain) {
                                const hakuarvo = searchParams.get(avain);
                                return Palvelin.lahetaJson(res, await varasto.hae(avain, hakuarvo));
                            }
                            return Palvelin.lahetaVirheilmoitus(res, `Hakukriteeri ei vastaa mitään: ${varasto.hakuavaimet}`);

                        case `/${varasto.resurssi}/kuvat`:
                            const nimi = searchParams.get("nimi");
                            if (nimi) {
                                const kuva = await varasto.haeKuva(nimi);
                                if (kuva && kuva.kuvaData) {
                                    return Palvelin.lahetaKuva(res, kuva);
                                }
                            }
                            res.statusCode = 404;
                            res.setHeader("Access-Control-Allow-Origin", "*");
                            res.end();
                            break;

                        default:
                            Palvelin.lahetaVirheilmoitus(res, `Resurssia ${reitti} ei löydy`);
                    }
                } catch (virhe) {
                    Palvelin.lahetaVirheilmoitus(res, virhe.message);
                }
            });

            palvelin.listen(port, host, () => console.log(`${host}:${port} palvelee...`));
        }
    } catch (tiedostovirhe) {
        console.error(tiedostovirhe);
        console.log(`Asetustiedostoa ${varastoNimi} ei löydy.`);
    }
} catch (virhe) {
    console.error("Virhe:", virhe);
}
