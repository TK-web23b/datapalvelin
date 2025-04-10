import { rejects } from 'node:assert';
import path from 'node:path';



const virheViesti=`
#################################################
Käyttö: node datapalvelin <varastoasetustiedosto>

Esimerkki: node datapalvelin jaatelovarasto
#################################################`;



async function lueKomentorivi(){
    return new Promise((resolve,reject)=>{
        if(process.argv.length<3){
            reject(virheViesti);

        }

        else{
            let[, , asetustiedostoNimi]=process.argv;
            const tiedostotunniste=path.extname(asetustiedostoNimi).toLowerCase();
            if(tiedostotunniste===''){
                asetustiedostoNimi+='.json';
            }
            resolve(asetustiedostoNimi);
        }
    });
}

export{lueKomentorivi}