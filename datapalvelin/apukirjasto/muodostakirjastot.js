const urlpolku = polku => new URL(`file://${JUURIPOLKU}/${polku}`);

async function muodostaKirjastot(polut) {
    const {muunnin} = await import(urlpolku(polut.datasovitinPolku));
    const { LukijaKirjoittaja } = 
        await import(urlpolku(polut.lukijakirjoittajaPolku));
    const { Tietovarasto } =
        await import(urlpolku(polut.tietovarastokerrosPolku));
    const { varastokerros } =
        await import(urlpolku(polut.varastokerrosPolku));
    
    const varasroconfig = 
        await import(urlpolku(polut.varastoasetuksetPolku), {with:{type: 'json'}});
        
    const kuvatyypit =
        await import(urlpolku(polut.mimePolku), {with:{type:'json'}});
    
    return {
        varastoconfig:varastoconfig.deafult,
        sovitin:muunnin,
        tietovarasto:{tietovarasto},
        varastokerros:{varastokerros},
        lukijakirjoittaja:{LukijaKirjoittaja},
        kuvatyypit:kuvatyypit.default,
        polut
    }

}

export{muodostaKirjastot}