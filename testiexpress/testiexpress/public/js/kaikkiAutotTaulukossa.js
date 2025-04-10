const perusUrl = "http://localhost:3002/autot";

const trElementti = document.createElement("tr");
const imgElementti = document.createElement("img");
const tdElementti = document.createElement("td");

document.addEventListener("DOMContentLoaded", aloita);
async function aloita() {
  const tulosalue = document.getElementById("tulosalue");

  const data = await fetch(perusUrl, { mode: "cors" });

  const dataJson = await data.json();

  for (const alkio of dataJson) {
    tulosalue.appendChild(teeRivi(alkio));
  }
}

function teeRivi(data) {
  const tr = trElementti.cloneNode(false);
  tr.appendChild(teeSolu(data.tuotenumero));
  tr.appendChild(teeSolu(data.merkki));
  tr.appendChild(teeSolu(data.varit.join(", ")));
  tr.appendChild(teeSolu(data.hinta));
  tr.appendChild(teeSolu(data.kuva));
  const kuva = imgElementti.cloneNode(false);
  kuva.src = `${perusUrl}/kuvat?nimi=${data.kuva}`;
  tr.appendChild(kuva);
  return tr;
}

function teeSolu(tieto) {
  const td = tdElementti.cloneNode(false);
  td.textContent = tieto;
  return td;
}
