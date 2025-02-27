import path from "node:path";

class Varastokerros {
    #lukija;
    #varastopolku;
    #kuvakansioPolku;
    #asetukset;

    constructor(KIRJASTOT) {
        this.#asetukset = KIRJASTOT.varastoconfig;
        this.#varastopolku = KIRJASTOT.polut.varastotiedostopolku;
        this.#kuvakansioPolku = KIRJASTOT.polut.kuvakansiopolku;
        const { LukijaKirjoittaja } = KIRJASTOT.varastofunktiot;
        this.#lukija = new LukijaKirjoittaja(KIRJASTOT.sovitin);
    }

    // getterit
    get perusavain() {
        return this.#asetukset.perusavain;
    }

    get hakuavaimet() {
        return this.#asetukset.hakuavaimet;
    }

    get resurssi() {
        return this.#asetukset.resurssi;
    }

    async haeKaikki() {
        return await this.#lukija.lueVarasto(this.#varastopolku);
    }

    async hae(avain, arvo) {
        const tiedot = await this.#lukija.lueVarasto(this.#varastopolku);
        return tiedot.filter((alkio) => alkio[avain] === arvo);
    }

    async haeAvaimet(){
        try{
            const tiedot = await this.#lukija.luevarasto(this.#varastopolku);
            const nimet = new Set(tiedot.flatmap(alkio=>objevt.keys(alkio)));
            return [...nimet];
        }
        catch(virhe) {

        
            console.log(virhe);
            return [];
        }
    }
    async hasArvot(avain, vainkertalleen=false){
        try{
            const tiedot = await this.#lukija.lueVarasto(this)
            const arvot=[];
            for(const alkio of tiedot){
                if(alkio[avain] && typeof alkio[avain] !=='undefined'){
                    arvot.push(alkio(avain));
                }
            }
            if(vainkertaalleen){
                const apu=new Set(arvot);
                return [...apu];
            }
            else{
                return arvot;
            }
        }

        catch(virhe) {

        
            console.log(virhe);
            return [];
        }
    }
}

export { Varastokerros };
