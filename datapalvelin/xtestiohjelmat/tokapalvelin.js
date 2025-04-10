import http from 'node:http';

const port=3000;
const host='localhost';

const resurssi={viesti:'hei maailma'};

const palvelin=http.createServer((req, res)=>{
    res.writeHead(200,{
        'content-Type':'text/html',
        'Access-control-Allow-Origin':'*'
        
    });

    res.write(JSON,stringify(resurssi));
    res.end('<h1>hei!<h1>');
});

palvelin.listen(port, host,
    ()=>console.log(`${host}:${port} palvelee`));


