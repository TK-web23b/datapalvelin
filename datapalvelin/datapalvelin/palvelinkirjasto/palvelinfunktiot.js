export default class Palvelin {
  static lahetaJson(res, jsonResurssi, statuskoodi = 200) {
    const jsonData = JSON.stringify(jsonResurssi);
    const jsonPituus = Buffer.byteLength(jsonData, "utf8");
    res.statusCode = statuskoodi;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-length", jsonPituus);
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.end(jsonData);
  }

  static lahetaVirheilmoitus(res, viesti) {
    Palvelin.lahetaJson(res, { viesti, tyyppi: "virhe" });
  }

  static valitsehakuavain(hakuParams, hakuavaimet) {
    for (const avain of hakuavaimet) {
      if (hakuParams.has(avain)) {
        return avain;
      }
    }
    return null;
  }

  static lahetaKuva(res, kuvaresusrssi) {
    res.writeHead(200, {
      "Content-Type": kuvaresusrssi.mime.tyyppi,
      "Content-Length": Buffer.byteLength(
        kuvaresusrssi.kuvaData,
        kuvaresusrssi.mime.koodaus
      ),
      "Access-Control-Allow-Origin": "*",
    });
    res.end(kuvaresusrssi.kuvaData, kuvaresusrssi.mime.koodaus);
  }
}
