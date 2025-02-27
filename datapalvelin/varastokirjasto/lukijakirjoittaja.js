import fs from "node:fs/promises";

class LukijaKirjoittaja {
    #muunnin;
    constructor(muunnin) {
        this.#muunnin = muunnin;
    }

    async lueVarasto(tiedostopolku) {
        try {
            const data = await fs.readFile(tiedostopolku, "utf-8");
            return JSON.parse(data).map((alkio) => this.#muunnin(alkio));
        } catch (virhe) {
            console.log(virhe);
            return [];
        }
    }
}

export { LukijaKirjoittaja };
