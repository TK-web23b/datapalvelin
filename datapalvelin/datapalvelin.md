# datapalvelin API

yleiskäyttöinen datapalvelin tietojen hakuun.

Tiedot talletetaan json-tiedostoon. Tiedot ovat taulukossa olioina.

```json
[
  {
    "id": 1,
    "nimi": "jokuhomma",
    "hinta": 2,
    "kuva": "jokuhomma.png"
  },
  {
    "id": 2,
    "nimi": "mustikka",
    "hinta": 3,
    "kuva": "mustikka.png"
  }
]
```

Olioiden rakenne on vapaa, mutta vain "ensimmäisen tason" kenttiä voi käyttää tietojen hakemisessa.

esimerkiksi seuraava on mahdollinen:

```json
{
  "nimi": "eka",
  "tiedot": {
    "teksti": "tähän paljon tekstiä...",
    "huomautukset": ["huomi1", "huomi2"]
  }
}
```

Haku mahdollistaa vain nimellä.

## varastokerros API

### haeKaikki()

palauttaa kaikki oliot taulukkona. Jos olioita ei ole tai tulee virhe, palauttaa tyhjän taulukon `[]`.


### **hae(avain, arvo)**

Palauttaa tyhjänä taulukkona. Myös virhetilanteessa palauttaa tyhjän taulukon.

```js
hae("id", 1);
```

---

### **HaeArvot(avain, vainKerran=false)**

Palauttaa taulukossa kaikki parametrina annetun avaimen arvot. Jos arvoja ei löydy, palauttaa tyhjän taulukon. Jos vain arvo tulee taulukkoon vain kerran, muuten arvo voi olla taulukossa useampaan kertaan. Myös virhetilanteessa palautetaan tyhjän taulukon.

Esim:
```js
haeArvot("hinta");
taj;
haeArvot("hinta", false);
```

Palauttaa:

```js
haeArvot("hinta", true);
```

```json
[2, 3]
```

---

### **haeAvaimet()**

Palauttaa taulukon, jossa on kaikki olioista löytyvät kenttien nimet kertaalleen. Tutkii vain ensimmäisen tason avaimia. Jos avaimia ei löydy tai tulee virhe palautetaan tyhjä taulukko.

Esimerkiksi "jäätelö":

```json
["id", "nimi", "hinta", "kuva"]
```

---

### **haeKuva(kuvatiedostonNimi)**

Palauttaa kuvan binäärimuodossa (blob). Jos kuvaa ei löydy, palauttaa `null`. Tunnistettavat kuvatyypit ovat: png, jpeg, jpg, gif ja ico.

```js
kuvaData, mime;
```

Missä kuvaData on kuvan binääri data (blob). Jos kuvaa ei löydy:

Palauttaa:

```null```

Mime-tyyppi on muodossa:

```js
{tyyppi: "image/png", koodaus:"binary"}
```

---

### **haeKuvaLista()**

Palauttaa kuvahakemistossa olevia tiedostojen nimet taulukkona. Jos kuvia ei ole tai tulee virhe, palauttaa tyhjän taulukon.

---

## Vakiot

### **perusavain**

Yksilöi taulukossa olevan olion. Palauttaa asetustiedostossa olevan "perusavain" kentän arvon.

### **hakuavaimet**

Palauttaa asetustiedostossa olevan "hakuavaimet" kentän arvon (taulukko).

### **resurssi**

Palauttaa asetustiedostossa olevan "resurssi" kentän arvon.

---

## varastokäsittelijä API

### **lueVarasto(tiedostopolku)**

Palauttaa JSON-taulukon. Virhetilanteessa palauttaa tyhjän taulukon.

### **lueKuva(kuvapolku)**

### **lueKuvalista(kuvakansiopolku)**

### **kirjaoitaVarasto(tiedostopolku,data)**