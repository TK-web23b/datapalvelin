import { useState, useEffect } from "react";
import "./app.css";
// import Kortti from "./Kortti";
import Taulukko from "./Taulukko";
import Korttivalikoima from "./Korttivalikoima";
import Haku from "./Haku";

import { kaikkiUrl } from "./urlit";

function App() {

  const [tulos, setTulos] = useState([]);
  const [valittu, setValittu] = useState(0); // käytin usestatea taulukon vaihtamisessa

  async function haeKaikki() {
    const data = await fetch(kaikkiUrl, { mode: "cors" });
    const dataJson = await data.json();

    setTulos(dataJson);
  } //haeKaikki loppu

  useEffect(() => {
    haeKaikki();
  }, []);

  function vaihdaValittuKomponentti(){
    switch (valittu){
      case 0: return <h2>Valitse esitysmuoto</h2>;
      case 1: return <Korttivalikoima kortit={tulos} />;
      case 2: return <Taulukko tiedot={tulos} />;
      case 3: return <Haku />;
    }
  }
  return (
    // Lisätty button jolla voi viahtaa kumpi taulukko näkyy
    <div className="App">
      <div className="nappi">
        <button onClick={() => setValittu(1)}>Kaikki kortteina</button>
        <button onClick={() => setValittu(2)}>Kaikki taulukossa</button>
        <button onClick={() => setValittu(3)}>Haku</button>
        <button onClick={() => setValittu(0)}>Alkutila</button>
        {vaihdaValittuKomponentti()}
      </div>
    </div>
  );
}

export default App;
