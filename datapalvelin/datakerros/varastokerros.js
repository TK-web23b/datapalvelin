import path from 'node:path';

class Varastokerros {
    #lukija;
    #varastoPolku;
    #kuvakansioPolku;
    #asetukset;
    #tukiTYYPIT;
    #kuvakansio;

    constructor(KIRJASTOT) {
        this.#asetukset = KIRJASTOT.varastoconfig;
        this.#tukiTYYPIT = KIRJASTOT.kuvatyypit;
        this.#varastoPolku = KIRJASTOT.polat.varastotiedostoPolku;
        this.#kuvakansioPolku = KIRJASTOT.polat.kuvakansioPolku;
        this.#kuvakansio = KIRJASTOT.polat.kuvakansio;
        this.#lukija = KIRJASTOT.lukijakirjoittaja;

        const funktio = KIRJASTOT.sovn.tnim;
        new funktio(this.#asetukset.numerokentät);
    }

    get kuvakansio() {
        return this.#kuvakansio;
    }

    get tuetutKuvatyypit() {
        return Object.keys(this.#tukiTYYPIT);
    }

    get perusavain() {
        return this.#asetukset.perusavain;
    }

    async haeTiedot() {
        try {
            const tiedot = await this.#lukija.lueVarasto(this.#varastoPolku);
            return tiedot;
        } catch (virhe) {
            console.log("Virhe haettaessa tietoja:", virhe);
            return null;
        }
    }

    async haeAvaimella(avain) {
        try {
            const tiedot = await this.haeTiedot();
            if (!tiedot) return null;
            return tiedot[avain] || null;
        } catch (virhe) {
            console.log("Virhe haettaessa tietoa avaimella:", virhe);
            return null;
        }
    }

    async haeKuva(tiedostonimi) {
        if (!this.#kuvakansioPolku || this.#kuvakansioPolku.length === 0) return null;

        try {
            const tiedostotunniste = path.extname(tiedostonimi).toLowerCase();
            if (!this.#tukiTYYPIT[tiedostotunniste]) return null;

            const kuvapolku = path.join(this.#kuvakansioPolku, tiedostonimi);
            return await this.#lukija.lueKuva(kuvapolku);
        } catch (virhe) {
            console.log("Virhe kuvan haussa:", virhe);
            return null;
        }
    }
}

export { Varastokerros };
