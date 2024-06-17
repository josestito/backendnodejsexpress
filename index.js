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
//MIDLEWARE PARA NO TENER PROBELMAS DE ACCESO CORS CUANDO HAGAMOS PETICIONES AL BACKEND DESDE EL FRONTEND
// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


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
var multipart = require('connect-multiparty');
var multipartMidleware = multipart({ uploadDir: './upload'});

//DECLARAMOS LAS RUTAS Y LA ACCION QUE EJECUTARÁ DESDE NUESTRO CONTROLADOR
router.get('/home',projectController.home);
router.post('/test',projectController.test);
router.post('/guardarproyecto',projectController.GuardarProyectos);
router.get('/proyectos/:id?',projectController.ObtenerProyectos);
router.get('/todoslosproyectos',projectController.ListarProyectos);
router.post('/editar/:id?',projectController.ActualizarProyectos);
router.post('/eliminar/:id?',projectController.BorrarProyecto);
//IMPLEMENTAMOS UN MIDLEWARE SOLO A ESTA RUTA (multipartMidleware)
router.post('/subirimagen/:id?',multipartMidleware,projectController.SubirImagen);
//ACA EXPRESS ACCEDE A LAS RUTAS Y LAS UTILIZA MUY IMPORTANTE
app.use('/', router);