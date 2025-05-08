import path from "node:path";

class Varastokerros {
  #lukija;
  #varastopolku;
  #kuvakansioPolku;
  #asetukset;
  #MIMETYYPIT;
  #kuvakansio;

  constructor(KIRJASTOT) {
    this.#asetukset = KIRJASTOT.varastoconfig;

    this.#MIMETYYPIT = KIRJASTOT.kuvatyypit;

    this.#varastopolku = KIRJASTOT.polut.varastotiedostoPolku;
    this.#kuvakansio = KIRJASTOT.polut.kuvakansio;

    this.#kuvakansioPolku = KIRJASTOT.polut.kuvakansioPolku;

    const { LukijaKirjoittaja } = KIRJASTOT.lukijakirjoittaja;

    const Muunnin = KIRJASTOT.sovitin;

    this.#lukija = new LukijaKirjoittaja(
      new Muunnin(this.#asetukset.numerokentät)
    );
  }

  // getterit

  get kuvakansio() {
    return this.#kuvakansio;
  }

  get tuetutKuvatyypit() {
    return Object.keys(this.#MIMETYYPIT);
  }

  get perusavain() {
    return this.#asetukset.perusavain;
  }

  get hakuavaimet() {
    return this.#asetukset.hakuavaimet;
  }

  get numeeriset() {
    return this.#asetukset.numerokentät;
  }
  get resurssi() {
    return this.#asetukset.resurssi;
  }

  async haeKaikki() {
    return await this.#lukija.lueVarasto(this.#varastopolku);
  }

  async hae(avain, arvo) {
    const tiedot = await this.#lukija.lueVarasto(this.#varastopolku);
    return tiedot.filter((alkio) => alkio[avain] == arvo);
  }

  async haeAvaimet() {
    try {
      const tiedot = await this.#lukija.lueVarasto(this.#varastopolku);
      const nimet = new Set(tiedot.flatMap((alkio) => Object.keys(alkio)));
      return [...nimet];
    } catch (virhe) {
      console.log(virhe);
      return [];
    }
  }

  async haeArvot(avain, vainKertaalleen = false) {
    try {
      const tiedot = await this.#lukija.lueVarasto(this.#varastopolku);
      const arvot = [];

      for (const alkio of tiedot) {
        if (Object.keys(alkio).includes(avain)) {
          arvot.push(alkio[avain]);
        }
      }

      if (vainKertaalleen) {
        const apu = new Set(arvot);
        return [...apu];
      } else {
        return arvot;
      }
    } catch (virhe) {
      console.log(virhe);
      return [];
    }
  }
  async haeKuvalista() {
    const kuvat = await this.#lukija.lueKuvalista(this.#kuvakansioPolku);
    const tuetutKuvaTyypit = Object.keys(this.#MIMETYYPIT);
    return kuvat.filter((kuva) =>
      tuetutKuvaTyypit.includes(path.extname(kuva).toLowerCase())
    );
  }

  //haekuvalista loppuu

  async haeKuva(kuvatiedostonNimi) {
    if (this.#kuvakansioPolku && this.#kuvakansioPolku.length > 0) {
      try {
        const tiedostotunniste = path.extname(kuvatiedostonNimi).toLowerCase();
        if (!this.#MIMETYYPIT[tiedostotunniste]) return null;
        const mime = this.#MIMETYYPIT[tiedostotunniste];
        const kuvapolku = path.join(this.#kuvakansioPolku, kuvatiedostonNimi);
        const kuvaData = await this.#lukija.lueKuva(kuvapolku);
        return { kuvaData, mime };
      } catch (virhe) {
        console.log(virhe);
        return null;
      }
    }
  }
}
// luokan loppu
export { Varastokerros };
