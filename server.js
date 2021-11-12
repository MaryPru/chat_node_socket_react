const express = require('express');
const cors = require('cors')

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true})) //парсинг ссылки

const rooms = new Map();

app.get('/rooms/:id', (req, res) => {
        const {id: roomId} = req.params
        const obj = rooms.has(roomId)
            ? {
                users: [...rooms.get(roomId).get('users').values()],
                messages: [...rooms.get(roomId).get('messages').values()]
            }
            : {users: [], messages: []};
        res.json(obj);
    }
)

app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []]
        ]));
    }
    res.send();
})

io.on('connection', (socket) => {
    socket.on('ROOM_JOIN', (req) => {
        const {roomId, userName, userId} = req
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id, {
            userName,
            userId
        })
        const users = [...rooms.get(roomId).get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM_SET_USERS', users);
        socket.to(roomId).emit('ROOM_SET_NEW_USER', req)
    })

    socket.on('ROOM_NEW_MESSAGE', (req) => {
        rooms.get(req.roomId).get('messages').push(req)
        socket.to(req.roomId).broadcast.emit('ROOM_NEW_MESSAGE', req);
    })

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()];
                socket.to(roomId).broadcast.emit('ROOM_SET_USERS', users);
            }
        })
    })

});


server.listen(8888, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Сервер запущен!')
});
