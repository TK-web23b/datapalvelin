import "./Taulukko.css";
import Kuva from "./kuva";

import { kuvaUrl } from "./urlit";

function Rivi({ data }) {
  return (
    <tr className="Rivi">
      <td>{data.tuotenumero}</td>
      <td>{data.merkki}</td>
      <td>{data.värit.join(',')}</td>
      <td>{data.hinta}</td>
      <td>{data.kuva}</td>
      <td>
        <Kuva kuvaSrc={kuvaUrl + data.kuva} />
      </td>
    </tr>
  );
}

export default function Taulukko({ tiedot }) {

  return (
    <div className="Taulukko">
      <h1>Autot</h1>
      <table>
        <thead>
          <tr>
            <th>Tuotenumero</th>
            <th>Merkki</th>
            <th>Värit</th>
            <th>Hinta</th>
            <th>Kuvan nimi</th>
            <th>Kuva</th>
          </tr>
        </thead>
        <tbody>
          {tiedot.map(data => 
            <Rivi key={data.tuotenumero} data={data} />)
          }
        </tbody>
      </table>
    </div>
  );
}
