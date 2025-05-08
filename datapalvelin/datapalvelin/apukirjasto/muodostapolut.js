import path from 'node:path';

function muodostaPolut(JUURI, config, varastoasetukset){
    //varastokirjastopolut
    const datakerrosKansio=path.join(JUURI,config.datakerros.kansio);
    const tietovarastokerrosPolku=path.join(datakerrosKansio,config.datakerros.tietovarastokerros);
    const varastokerrosPolku=path.join(datakerrosKansio,config.datakerros.varastokerros); 
    const varastokirjastoKansio=path.join(JUURI,config.varastokirjasto.kansio);
    const datasovitinPolku=path.join(varastokirjastoKansio,config.varastokirjasto.datasovitin);
    const lukijakirjoittajaPolku=path.join(varastokirjastoKansio,config.varastokirjasto.lukijakirjoittaja);
    const mimePolku=path.join(varastokirjastoKansio,config.varastokirjasto.kuvatyypit);
    //varastopolut
    const{kansio,asetustiedosto,varastotiedosto,kuvakansio}=varastoasetukset.varasto;
    const varastokansioPolku=path.join(JUURI,config.varastot.kansio,kansio);
    const polut={
        juuripolku:JUURI,
        //varastokirjastopolut
        varastokirjastoKansio,
        tietovarastokerrosPolku,
        varastokerrosPolku,
        datasovitinPolku,
        lukijakirjoittajaPolku,
        mimePolku,
        //Varastopolut
        varastokansioPolku,
        varastoasetuksetPolku:path.join(varastokansioPolku,asetustiedosto),
        varastotiedostoPolku:path.join(varastokansioPolku,varastotiedosto),
        kuvakansio
    };

    polut.kuvakansioPolku=kuvakansio?path.join(varastokansioPolku,kuvakansio):'';
    //korvataan yleismuunnin paikallisella muuntimella
    //mik채li varastoasetuksissa on muunnin-kentt채
    const avaimet=Object.keys(varastoasetukset.varasto);
    if (avaimet.includes('muunnin')&&
        varastoasetukset.varasto.muunnin &&
        varastoasetukset.varasto.muunnin.length>0){
            polut.datasovitinPolku=path.join(varastokansioPolku, varastoasetukset.varasto.muunnin);
    }
    //korvataan lukijakirjoittaja paikallisella versiolla
    //mik채li varastoasetuksissa on lukijakirjoittaja-kentt채
    if (avaimet.includes('lukijakirjoittaja')&&
        varastoasetukset.varasto.lukijakirjoittaja &&
        varastoasetukset.varasto.lukijakirjoittaja.length>0){
            polut.lukijakirjoittajaPolku=
            path.join(varastokansioPolku, varastoasetukset.varasto.lukijakirjoittaja);
    }
    return polut;
}//funktion loppu

export {muodostaPolut};