(function () {
  document.addEventListener("DOMContentLoaded", aloita);

  async function aloita() {
    const tulosalue = document.getElementById("tulosalue");
    const data = await fetch("http://localhost:3001/jäätelöt");
    const jaatelot = await data.json();

    // console.log(jaatelot);
    for (const jaatelo of jaatelot) {
      const tr = document.createElement("tr");
      tr.appendChild(teeSolu(jaatelo.id));
      tr.appendChild(teeSolu(jaatelo.nimi));
      tr.appendChild(teeSolu(jaatelo.hinta));
      tr.appendChild(teeSolu(jaatelo.kuva));
      const img = document.createElement("img");
      img.src = `http://localhost:3001/jäätelöt/kuvat?nimi=${jaatelo.kuva}`;
      tr.appendChild(img);
      tulosalue.appendChild(tr);
    }
  } //aloita loppu

  function teeSolu(tieto) {
    const td = document.createElement("td");
    td.textContent = tieto;
    return td;
  }
})();
