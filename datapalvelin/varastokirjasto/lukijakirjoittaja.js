import fs from "node:fs/promises";

class Oletus {
  muunna(muunnettava) {
    return muunnettava;
  }
}

class LukijaKirjoittaja {
  #muunnin;

  constructor(muunnin = new Oletus()) {
    this.#muunnin = muunnin;
  }

  async lueVarasto(tiedostopolku) {
    try {
      const data = await fs.readFile(tiedostopolku, "utf8");
      return JSON.parse(data).map((alkio) => this.#muunnin.muunna(alkio));
    } catch (virhe) {
      //consolelog virhe
      return [];
    }
  }

  //lue varasto loppuu

  async lueKuva(kuvapolku) {
    try {
      return await fs.readFile(kuvapolku, "binary");
    } catch (virhe) {
      //consolelog virhe
      console.log(virhe);
      return null;
    }
  }

  //luekuva loppuu

  async lueKuvalista(Kuvakansiopolku) {
    try {
      const hakemisto = await fs.readdir(Kuvakansiopolku, {
        withFileTypes: true,
      });
      const apu = hakemisto.filter((tiedosto) => !tiedosto.isDirectory());
      return apu.map((tiedosto) => tiedosto.name);
    } catch (virhe) {
      console.log(virhe);
      return [];
    }
  } //luekuva lista loppuu
} //luokan loppu

export { LukijaKirjoittaja };
