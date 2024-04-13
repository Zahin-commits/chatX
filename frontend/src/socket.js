import {io} from 'socket.io-client';

// const URL = 'http://localhost:3000/';
const URL = 'https://chatx-gx3j.onrender.com/';

export const socket = io(URL);