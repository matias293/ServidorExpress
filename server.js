// import express from 'express';
// import path from 'path';
const express = require('express')

const puerto = 8080;
const fs = require('fs/promises');


const app = express()

const server = app.listen(puerto, () =>
  console.log('Server Up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR =>', err);
});



const random = () => {
  return  Math.floor(Math.random() * (3 - 0) + 0)
}






// Parte 1

let counterItem = 0;
const productos = [
    {
        "title" :"Escuadra",
        "price" : 123,
        "thumbnail": 'https://media.tycsports.com/files/2019/08/09/65155/modo-romero.jpeg'
    },
    {
        "title" :"Calculadora",
        "price" : 51,
        "thumbnail": 'https://media.tycsports.com/files/2019/08/09/65155/modo-romero.jpeg'
    },
    {
        "title" :"Regla",
        "price" : 31,
        "thumbnail": 'https://media.tycsports.com/files/2019/08/09/65155/modo-romero.jpeg'
    }
]


app.get('/items', (req, res) => {
    
    counterItem++;

    res.json({'items':productos, 'cantidad':productos.length})
});



let counterItemRandom = 0;

//Part2
app.get('/items-random', async(req, res) => {
    try {
        
    counterItemRandom++
    
    const data = await fs.readFile('./productos.txt','utf-8')
    
    let producto = JSON.parse(data,null,2)

    let obj ={item: producto[random()]};

    res.json(obj);
    
} catch (error) {
    console.log(error)
}
});



app.get('/visitas', (req, res) => {
    
    res.json({
       visitas:{
           'items': counterItem,
           'items-random': counterItemRandom
       },
  });
});


