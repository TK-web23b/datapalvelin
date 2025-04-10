const kaikkiUrl = "http://localhost:3002/autot";

const kuvaUrl = `${kaikkiUrl}/kuvat?nimi=`;
const haeAvaimellaUrl = `${kaikkiUrl}/ehdolla?`
const haePerusavaimellaUrl= `${haeAvaimellaUrl}tuotenumero?=`

export { kaikkiUrl,
    kuvaUrl,
    haeAvaimellaUrl,
    haePerusavaimellaUrl 
}
