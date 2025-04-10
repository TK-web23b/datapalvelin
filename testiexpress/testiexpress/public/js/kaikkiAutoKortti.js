const perusUrl = "http://localhost:3002/autot";

document.addEventListener("DOMContentLoaded", aloita);

async function aloita() {
  const tulosalue = document.getElementById("tulosalue");

  const data = await fetch(perusUrl, { mode: "cors" });
  const dataJson = await data.json();

  for (const alkio of dataJson) {
    tulosalue.appendChild(muodostaDataKortti(alkio));
  }
}

function muodostaDataKortti(data) {
  const section = document.createElement("section");
  const h2 = document.createElement("h2");
  h2.textContent = data.merkki;
  section.appendChild(h2);
  section.appendChild(teeKentta("Tuotenumero", data.tuotenumero));
  section.appendChild(teeLista("Värit", data.varit));
  section.appendChild(teeKentta("hinta", data.hinta));
  section.appendChild(teeKentta("Kuva", data.kuva));
  section.appendChild(teeKuva(data.kuva));
  return section;
}

function teeKentta(kentta, tieto) {
  const p = document.createElement("p");
  p.textContent = `${kentta}: ${tieto}`;
  return p;
}

function teeLista(kentta, listantiedot) {
  const ul = document.createElement("ul");
  //kenttää voisi käyttää selitteenä.
  for (const alkio of listantiedot) {
    const li = document.createElement("li");
    li.textContent = alkio;
    ul.appendChild(li);
  }
  return ul;
}

function teeKuva(kuvanNimi) {
  const kuva = document.createElement("img");
  kuva.src = `${perusUrl}/kuvat?nimi=${kuvanNimi}`;
  return kuva;
}
