import { useState } from 'react';

import './Valintalista.css';

function Optio({ vaihtoehto }) {
    return  <option value={vaihtoehto}>{vaihtoehto}</option>
}

export default function Valintalista({ vaihtoehdot, paivita }) {

    const [valinta, setValinta] = useState('');

    function paivitaValinta(e){
        e.preventDefualt();
        setValinta(e.target.value);
        paivita(e.target.value);
    }

    return (
        <div className="valintalista"> 
        <select value={valittu} onChange={paivitaValinta}> 
            {valinnat.map(alkio=> <Optio key={alkio} vaihtoehto={alkio} />)}
        </select>
        </div>

    )

}