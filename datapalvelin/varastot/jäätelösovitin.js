'use strict'

function muunna(muutettavaOlio){
    if(!muutettavaOlio) return {};

    return Object.assign(muutettavaOlio, {
        id: +muutettavaOlio.id,
        hinta: Number(muutettavaOlio.hinta),
    });
}

module.exports={muunna}