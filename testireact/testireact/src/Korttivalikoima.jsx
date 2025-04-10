import "./Korttivalikoima.css";

import Kortti from "./Kortti";

export default function Korttivalikoima({ kortit }) {
  return (
    <div className="Korttivalikoima">
      <h1>Autot</h1>
      <div className="tulosalue">
        {
        kortit.map(kortintiedot => 
          <Kortti key={kortintiedot.tuotenumero} 
          tiedot={kortintiedot} />)
        }
      </div>
    </div>
  );
}
