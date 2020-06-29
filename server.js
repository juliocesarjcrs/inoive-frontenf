// const express = require('express');
import express from 'express';
const app = express();
// Settings
app.set('port', process.env.PORT || 3000)

// Para acceder al directorio actual
const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')));
// console.log('path ',path);

// Enable All CORS Requests

const cors = require('cors');
app.use(cors());
app.use(express.json());

//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))



// app.get('/', function(req, res){
//     res.send('Hello World!');
// });
// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));
  
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
    
})
