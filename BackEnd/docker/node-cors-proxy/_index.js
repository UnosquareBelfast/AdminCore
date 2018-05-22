const http = require('http');


const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', '*');
    // res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
    
    if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
    }
    res.setHeader('content-type', 'application/json');
    res.end( JSON.stringify({
        m : req.method
    }) );
});

server.listen(8585, () => {
    console.log('listening');
});