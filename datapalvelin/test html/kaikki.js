(function () {
    document.addEventListener('DOMContentLoaded', aloita); 

    async function aloita() {
        const tulosalue=document.getElementById('tulosalue');

        const data = await fetch('http://localhost:3000/jaatelot');
        const jaatelot = await data.json();

        //console.log(jaatelot);
        for(const jaatelo of jaatelot){
            const tr=document.createElement('tr');
            tr.appendChild(teesolu(jaatelo.id));
            tr.appendChild(teesolu(jaatelo.nimi));
            tr.appendChild(teesolu(jaatelo.hinta));
            tr.appendChild(teesolu(jaatelo.kuva));
            const img=document.createElement('img');
            img.src=`http:localhost:3000/jäätelöt/kuvat?nimi=${jaatelo.kuva}`;	
            tr.appendChild(Img);
            tulosalue.appendChild(tr);
        } 

    }//aloita loppu
    function teesolu(tieto){
        const td=document.createElement('td');
        td.textContent=tieto;
        return td;
    }
})();