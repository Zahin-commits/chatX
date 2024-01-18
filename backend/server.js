require('dotenv').config('./');
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const connectDB = require('./config/db');
const authRoute = require('./routers/authRoute');
const groupRoute = require('./routers/GroupRoute');
const messageRoute = require('./routers/messageRoute');
const { protect } = require('./middleware/auth');

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin:"http://localhost:3006"
}
));

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

app.listen(PORT,()=>{
 console.log(`the server is listening at port ${PORT}...`);
})