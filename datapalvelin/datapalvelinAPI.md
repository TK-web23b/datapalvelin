# Datapalvelin API

Yleiskäyttöinen datapalvelin tietojen hakuun.

Tiedot talletetaan json-tiedostoihin. TIedot ovat taulukossa olioina.

```json
[
    {
        "id":1,
        "nimi":"Mansikka",
        "hinta":2,
        "kuva":"mansikka.png"
    },
    {
        "id":2,
        "nimi":"Mustikka",
        "hinta":3.5,
        "kuva":"mustikka.png" 
    }
]
```

Olion rakenne on vapaa, mutta vain "ensimmäisen tason" (id) kentti' voi käyttää tietojen hakemisessa.

Esimerkiksi seuraava on mahdollinen:

```json
[
    {
        "nimi":"eka",
        "tiedot":{
            "teksti":"tekstiä....",
            "huomautukset":["huom1","huom2"]
        }
    }
]
```
Haku mahdollista vain nimellä.

## varastokerros API

### **haeKaikki()**
Palauttaa kaikki oliot taulukkona. Jos olioita ei ole tai tulee virhe, palauttaa tyhjän taulukon [].

### **hae(avain,arvo)**
Palauttaa taulukossa kaikki oliot, joiden avaimen/kentän arvo on annettu parametrina `arvo`. Jos ehdon täyttäviä olioita ei löydy, palauttaa tyhjän taulukon. Myös virhetilanteessa palauttaa tyjän taulukon.

Esim.
```js
hae('id',1)
```

### **Haearvot(avain, vainKerran=false)**
Palauttaa taulukossa kaikki parametrina annetun avaimen arvot. Jos arvoja ei löydy, palauttaa tyhjän taulukon. Jos `vainKerran` on `true`, niin arvo tulee taulukkoon vain kerran, muuten arvo voi olla taulukossa useampaan kertaan. Oletus: tulee kaikki arvot. Myös virhetilanteessa palauttaa tyhjän taulukon.

### **haeAvaimet()**
Palauttaa taulukon, jossa on kaikki olioista löytyvät kenttien nimet kertaalleen. Tutkii vain ensimmäisen tason avaimet. Jos avaimia ei löydy tai tulee virhe palautetaan tyhjä taulukko.

Esimerkiksi:
```json
["id","nimi","hinta","kuva"]
```

### **haeKuva(kuvatiedostonNimi)**
Palauttaa kuvan binäärimuodossa (blob). Jos kuvaa ei löydy, palauttaa `null`. Tunnistettavat kuvatyypit ovat: png, jpeg, jpg, gif ja ico.

### **haeKuvalista()**
Palauttaa kuvahakemistossa olevien tiedostojen nimet taulukkoon. Jos kuvia ei ole tai tulee virhe, palauttaa tyhjän taulukon. Palauttaa vain tuettujen tyyppien nimet(tässä ver. png,jpeg jpg gif ico)

## Vakiot

### **perusavain**
Yksilöi taulukossa olevan olion.
Palauttaa asetustiedostossa olevan `perusavain` kentän arvon.

### **hakuavaimet**
Palauttaa asetustiedostossa olevan `hakuavaimet` kentän arvon (taulukko).

### **resurssi**
Palauttaa asetustiedostossa olevan `resurssi` kentän arvon.

## Varastokäsittelijä API

### **lueVarasto(toedostopolku)**
Palauttaa JSON-taulukon. Virhetilanteessa palauttaa tyhjän taulukon.

### **lueKuva(kuvapolku)**

### **lueKuvalista(kuvakansionpolku)**

### **kirjoitaVarasto(tiedostopolku,data)**¨

<resurssi>/perusavain
-   /jäätelöt/perusavain

