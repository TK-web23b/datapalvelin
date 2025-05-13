import "./Kortti.css";
import Kuva from "./kuva";

import Lista from "./Lista";

import { kuvaUrl } from "./urlit";


export default function Kortti({ tiedot }) {
  return (
    <section className="Kortti">
      <h2>{tiedot.merkki}</h2>
      <p>
        <span className="selite">Tuotenumero: </span>
        <span className="data">{tiedot.tuotenumero}</span>
      </p>
      <h3>Värivalikoima</h3>
      <Lista alkiot={tiedot.värit} />
      <p>
        <span className="selite">Hinta:</span>
        <span className="data">{tiedot.hinta}</span>
      </p>
      <p>
        <span className="selite">Kuva:</span>
        <span className="data">{tiedot.kuva}</span>
      </p>

      <Kuva kuvaSrc={kuvaUrl + tiedot.kuva}></Kuva>
    </section>
  );
}
