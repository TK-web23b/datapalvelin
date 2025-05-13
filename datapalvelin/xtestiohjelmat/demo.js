const tiedot=[
        {
            "id":1,
            "nimi":"Mansikka",
            "hinta":2,
            "kuva":"mansikka.png"
        },
        {
            "id":2,
            "nimi":"Mustikka",
            "hinta":3,
            "kuva":"mustikka.png" 
        },
        {
            "id":3,
            "nimi":"Suklaa",
            "hinta":3,
            "kuva":"suklaa.png" 
        },
        {
            "id":4,
            "nimi":"Vanilja",
            "hinta":4,
            "kuva":"vanilja.png" 
        }
]

// console.log(tiedot.map(alkio=>Object.keys(alkio)));


// console.log(tiedot.flatMap(alkio=>Object.keys(alkio)));


// const nimet= new Set(tiedot.flatMap(alkio=>Object.keys(alkio)));
// console.log(nimet);
// console.log([...nimet]);
const avain='hinta';
const arvot=tiedot.map(alkio=>alkio[avain]);
console.log(arvot);