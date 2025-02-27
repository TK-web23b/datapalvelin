export default class Palvelin {
    static lahetaJson(res, jsonSisalto, statuskoodi = 200) {
        const jsonData = JSON.stringify(jsonSisalto);
        const jsonBuffer = Buffer.byteLength(jsonData);

        res.writeHead(statuskoodi, {
            'Content-Type': 'application/json',
            'Content-Length': jsonBuffer,
            'Access-Control-Allow-Origin': '*'
        });

        res.end(jsonData);
    }

    static lahetaVirhe(res, viesti) {
        Palvelin.lahetaJson(res, { viesti, tyyppi: 'virhe' });
    }

    static validoiHakuparametrit(hakuParams, hakuAvaimet) {
        for (const avain of hakuAvaimet) {
            if (hakuParams.has(avain)) {
                return avain;
            }
        }
        return null;
    }

    static lahetaKuva(res, kuvaResurssi) {
        res.writeHead(200, {
            'Content-Type': kuvaResurssi.mime.tyyppi,
            'Content-Length': Buffer.byteLength(kuvaResurssi.kuvaData),
            'Access-Control-Allow-Origin': '*'
        });

        res.end(kuvaResurssi.kuvaData, kuvaResurssi.mime.koodaus);
    }
}
