const express = require('express');
const app = express();
const port = process.env.PORT ?? 3000;
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:4321", "https://quadi48889.ac-page.com"],
        methods: ["GET", "POST"]
    }
}); // Asocia socket.io con el servidor

let contador = 0;

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.emit('counterUpdated', contador);

    socket.on('clickedButton', () => {
        contador++;
        io.sockets.emit('counterUpdated', contador);
    });
});

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.redirect('/');
});

server.listen(port, () => {
    console.log(`App listening on portttt ${port}`);
})