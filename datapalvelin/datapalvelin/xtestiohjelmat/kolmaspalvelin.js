import http from "node:http";

const port = 3000;
const host = "localhost";

const resurssi = { viesti: "hei maailma" };

const palvelin = http.createServer((req, res) => {
  const { pathname, searchParams } = new url(
    `http://${req.headers.host}${req.url}`
  );
  const reitti = decodeURIComponent(pathname);
  if (reitti === "/viesti") {
    res.writeHead(200, {
      "content-Type": "application/json",
      "Access-control-Allow-Origin": "*",
    });

    res.write(JSON, stringify(resurssi));
    res.end();
  } else if (reitti === "/henkilo") {
    if (searchParams.has("nimi")) {
      const nimi = searchParams.get("nimi");
      const arvo = henkilot[nimi] || "ei löydy";
      res.writeHead(200, {
        "content-Type": "application/json",
        "Access-control-Allow-Origin": "*",
      });

      res.write(JSON, stringify({ nimi, arvo }));
      res.end();
    }
  } else {
    res.writeHead(200, {
      "content-Type": "application/json",
      "Access-control-Allow-Origin": "*",
    });

    res.write(JSON, stringify({ nimi, arvo }));
    res.end();
  }

  palvelin.listen(port, host, () => console.log(`${host}:${port} palvelee`));
});
