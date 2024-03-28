require('dotenv').config('./');
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const authRoute = require('./routers/authRoute');
const groupRoute = require('./routers/GroupRoute');
const messageRoute = require('./routers/messageRoute');
const { protect } = require('./middleware/auth');
const {createServer} = require('http');
const {Server} = require('socket.io');
const connectDB = require('./config/db');

connectDB();

const server = createServer(app);
const io = new Server(server,{
    cors: {
      origin: "http://localhost:3006"
    }
  });

app.use(cors({
 origin:'http://localhost:3006',
 credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());



app.get('/',(req,res)=>{
 res.json('the server is online');
});

app.use('/auth',authRoute);
app.use('/group',groupRoute);
app.use('/message',messageRoute);
// app.use(protect);
app.get('/private',protect,(req,res)=>{
 res.json('this is a private route');
});


global.onlineUsers = new Map();
const groups = {};

io.on('connection',(socket)=>{
  global.chatScoket = socket;

    console.log('a user connected');
    socket.on('add-user',(userId)=>{
     onlineUsers.set(userId,socket.id);
     console.log('add user',onlineUsers);
    })

    socket.on('send-dm-message',(data)=>{
     const sendUserSocket = onlineUsers.get(data.to);
     console.log('send-dm',data);

     if(sendUserSocket){
       console.log('server recived dm msg',data.text);
       socket.to(sendUserSocket).emit("msg-recived",{
         from:data.from,
         to:data.to,
         username:data.username,
       text:data.text
       });
     }
    })
 
    socket.on('joinGroup', ({ groupId, userId }) => {
     socket.join(groupId);
     if (!groups[groupId]) {
       groups[groupId] = [];
     }
     groups[groupId].push(socket.id);
   });

   socket.on('send-groupMessage', (data) => {
    // io.to(data.to).emit('recived-groupMessage', { 
    socket.to(data.to).emit('recived-groupMessage', { 
       from:data.from,
       to:data.to,
       text:data.text
        });
   });

    socket.on('disconnect',()=>{
    console.log('a user disconnected');
   })
})


server.listen(PORT,()=>{
console.log(`the server is littening at port ${PORT}...`);
})
