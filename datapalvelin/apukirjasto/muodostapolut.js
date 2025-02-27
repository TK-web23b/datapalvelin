import path from 'node:path';

function muodostaPolut(JUURI,config.varastoasetukset) {

    //varastokirjastopolut
    const datakerrosKansio = path.join(JUURI, config.datakerros.kansio);
    const tietovarastokrrosPolku =
        path.join(datakerrosKansio, config.datakerros.tietovarastokerros);
    const varastokerrosPolku=path.join(datakerrosKansio,config.datakerros.varastokerros);

    const varastokirjastoKansio = PATH.JOIN(JUURI.config.varastokirjasto.Kansio);
    const datasovitinpolku = 
        path.join(varastokirjastoKansio,config.varastokirjasto.datasovitin);
    const lukijakirjoittajapolku=
        path.join(varastokirjastoKansio,config.varastokirjasto.lukijakirjoittaja);
    const mimePolku= path.join(varastokirjastoKansio,config.varastokirjasto.kuvatyypit);

    //varastopolut
    const {kansio, asetustiedosto, varastotiedosto,kuvakansio} = varastoasetukset.varasto;
    const varastoPolku = path.join(JUURI, config.varastot.kansio,kansio);

    const polut={
        juuriPolku:JUURI,

        //varastokirjastopolut
        varastokirjastoKansio,
        datasovitinPolku,
        lukijakirjoittajaPolku,
        tietovarastokerrosPolku,
        varastokerrosPolku,
        mimePolku,

        //varastopolut
        varastokansiopolku,
        varastoasetuksetPolku: path.join(varastokansioPolku,asetustiedosto),
        VARASTOTIEDOSTOPOLKU: path.join(varastokansioPolku,varastotiedosto),
        kuvakansio,
    };

    polut.kuvakansiopolku=kuvakansio?path.join(varastokansioPolku,kuvakansio):'';

    //korvataan yleismuunnin paikalliseslla muuntimella
    //mikäli varastoasetuksissa on muunnin kenttä
    const avaimet=Object.keys(varastoasetukset.varasto);

    if(avaimet.includes('muunnin')&&
        varastoasetukset.varasto.muunnin&&
        varastoasetukset.varasto.muunnin.lenght>0){
            polut.datasovitinpolku=
                path.join(varastokansioPolku,varastoasetukset.varasto.muunnin);
    }

    //korvataan lukijakirjoittaja paikallisella versiolla
    //mikäli varastoasetuksissa on lukijakirjoittaja kenttä
    if(avaimet.includes('lukijakirjoittaja')&&
        varastoasetukset.varasto.lukijakirjoittaja&&
        varastoasetukset.varasto.lukijakirjoittaja.length>0){
            polut.lukijakirjoittajapolku=
                path.join(varastokansioPolku,varastoasetukset.varasto.lukijakirjoittaja);
    }

    return polut;

}

     