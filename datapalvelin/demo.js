const tiedot =
[
    {
        "id": 1,
        "nimi": "Mansikka",
        "hinta": 2,
        "kuva": "Mansikka.jpg"
    },
    {
        "id": 2,
        "nimi": "Mustikka",
        "hinta": 2,
        "kuva": "Mustikka.jpg"
    },
    {
        "id": 3,
        "nimi": "Suklaa",
        "hinta": 2,
        "kuva": "Suklaa.jpg"
    },
    {
        "id": 4,
        "nimi": "Vadelma",
        "hinta": 4,
        "kuva": "Vadelma.jpg"
    }
]

//console.log(tiedot.map((alkio) => Object.keys(alkio)));

//console.log(tiedot.flatMap((alkio) => Object.keys(alkio)));

//const nimet = new Set(tiedot.flatMap((alkio) => Object.keys(alkio)));
//console.log(nimet);
//console.log([...nimet]);

const avain = "hinta";
const arvot = tiedot.map((alkio) => alkio[avain]);
console.log(arvot);