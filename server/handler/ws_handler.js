const wss1c = (wsc) => {
    wsc.on('connection', function connection(ws, request, socket) {
        ws.on('message', function message(data) {
          console.log(`Received message ${data} from user`);
        });
        ws.send('echo !!');
        socket.destroy();
    });
}

const wss2c = (wsc) => {
    wsc.on('connection', function connection(ws) {
        ws.send('Client connected !!');
        ws.on('message', function message(data) {
            console.log(`Received message ${data} from user`);
            ws.send('echo !!');
        });
    });
    wsc.on('close', function close(ws) {
        console.log('disconnected');
        ws.send('Goodbye!');
    })
}

const wss3c = (wsc) => {
    wsc.on('connection', function connection(ws, socket) {
        ws.send('No response');
        socket.destroy();
    });
}


module.exports = {
    wss1c,
    wss2c,
    wss3c
}