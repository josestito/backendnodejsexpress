'use strict'
//CONEXION AL SERVIDOR Y A LA BASE DE DATOS

//IMPORTAMOS TODAS LAS LIBRERIAS QUE USAREMOS
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//CREAMOS UNA INSTANCIA PARA EXPRESS
const app = express();
//UTILIZAMOS MIDDLEWARES PARA MANEJAR LAS SOLICITUDES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
//NOS CONECTAMOS AL SERVIDOR Y A LA BASE DE DATOS
mongoose.connect('mongodb://localhost:27017/portafolio').then(() =>{
    console.log("Conexión a la base de datos establecida");
    app.listen(3700, () => {
        console.log(`Servidor corriendo correctamente en la URL http://localhost:3700`);
      });
}).catch(err => console.log(err));

//IMPORTAMOS NUESTRO CONTROLADOR CON NUESTRAS ACCIONES
var router = express.Router();
var projectController = require('./Controllers/project.controller');

//DECLARAMOS LAS RUTAS Y LA ACCION QUE EJECUTARÁ DESDE NUESTRO CONTROLADOR
router.get('/home',projectController.home);
router.post('/test',projectController.test);
router.post('/guardarproyecto',projectController.GuardarProyectos);
router.get('/proyectos/:id?',projectController.ObtenerProyectos);
router.get('/todoslosproyectos',projectController.ListarProyectos);

//ACA EXPRESS ACCEDE A LAS RUTAS Y LAS UTILIZA MUY IMPORTANTE
app.use('/', router);