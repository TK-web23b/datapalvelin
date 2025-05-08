import { useState } from "react";

import Taulukko from './Taulukko'

import { haePerusavaimellaUrl } from "../urlit";

export default function Haku(){
      const [hakutulos, setHakutulos] = useState([]);
      const [hakuehto, setHakuehto] = useState('');

      async function hae(ehto){
        const data = await fetch(`${haePerusavaimellaUrl}${ehto}`, { mode: 'cors' });
        const datajson = await data.json();
        setHakutulos(datajson);
        setHakuehto('');
      }

      function naytaTulos(){
        if (hakutulos.length>0){
            return <Taulukko data={hakutulos} />
      }
      return <h2>Hakuehdolla ei löytynyt tietoja</h2>



      }
    return(
        <div className="haku">
            <div>
                <h1>AutoHaku</h1>
                <input 
                placeholder="Anna tuotenumero"
                value={hakuehto} 
                onChange={e=>setHakuehto(e.target.value)}
                onKeyUp={e=>{
                    if (e.Key==='Enter'){
                        setHakuehto(e.target.value);
                        hae (e.target.value);
                     }
                     }}
                      />
                      <button onClick={()=>hae(hakuehto)}>Hae</button>
            </div>
            <div>
                {naytaTulos}
            </div>

        </div>
    )
}