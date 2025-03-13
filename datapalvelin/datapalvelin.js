import http from 'node:http';
import path from 'node:path';
import { promises as fs } from 'node:fs';

// Määritellään juuripolku
import { fileURLToPath } from 'node:url';
const JUURIPOLKU = fileURLToPath(new URL(".", import.meta.url));

const urlpolku = polku => new URL(polku, `file://${JUURIPOLKU}`);

async function main() {
    const config = JSON.parse(await fs.readFile('./config.json', 'utf-8'));

    const apukirjastokansio = path.join(JUURIPOLKU, config.apukirjasto.kansio);
    console.log('apukirjastokansio:', apukirjastokansio); // Debugging statement

    console.log('config.apukirjasto.lueKomentorivi:', config.apukirjasto.lueKomentorivi); // Debugging statement
    const { lueKomentorivi } = await import(urlpolku(path.join(apukirjastokansio, config.apukirjasto.lueKomentorivi)));

    console.log('config.apukirjasto.muodostaPolut:', config.apukirjasto.muodostaPolut); // Debugging statement
    const { muodostaPolut } = await import(urlpolku(path.join(apukirjastokansio, config.apukirjasto.muodostaPolut)));

    console.log('config.apukirjasto.muodostaKirjastot:', config.apukirjasto.muodostaKirjastot); // Debugging statement
    const { muodostaKirjastot } = await import(urlpolku(path.join(apukirjastokansio, config.apukirjasto.muodostaKirjastot)));

    // Datapalvelinpolut
    const palvelinkirjastokansio = path.join(JUURIPOLKU, config.palvelinkirjasto.kansio);
    console.log('palvelinkirjastokansio:', palvelinkirjastokansio); // Debugging statement

    const palvelinfunktiopolku = path.join(palvelinkirjastokansio, config.palvelinkirjasto.palvelinfunktio);
    console.log('palvelinfunktiopolku:', palvelinfunktiopolku); // Debugging statement

    const { default: Palvelin } = await import(urlpolku(palvelinfunktiopolku));

    try {
        const varastoNimi = await lueKomentorivi();
        console.log('varastoNimi:', varastoNimi); // Debugging statement

        const asetuspolku = path.join(JUURIPOLKU, config.varastot.kansio, varastoNimi, config.varastot.asetustiedostotkansio);
        console.log('asetuspolku:', asetuspolku); // Debugging statement

        const varastoasetuksetpolku = urlpolku(path.join(asetuspolku, varastoNimi + '.json'));
        console.log('varastoasetuksetpolku:', varastoasetuksetpolku); // Debugging statement

        try {
            const varastoasetukset = await import(varastoasetuksetpolku);
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
                        console.log(virhe);
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
}

main().catch(console.error);
