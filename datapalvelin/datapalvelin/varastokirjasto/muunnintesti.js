'use strict'

function muunna(muutettavaOlio){
    if(!muutettavaOlio) return {};

    return Object.assign(muutettavaOlio, {
        id: +muutettavaOlio.id,
        hinta: Number(muutettavaOlio.hinta),
    });
}

const apu= {
        "id":4,
        "nimi":"Vanilja",
        "hinta":"4",
        "kuva":"vanilja.png" 
    }   