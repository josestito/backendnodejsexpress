'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = Schema
({
    name: String,
    description:String,
    category: String,
    langs:String,
    year: Number,
    image:String
    
});

//EXPORTAMOS NUESTRO MODELO, A LA VEZ QUE LO ENLAZAMOS CON NUESTRO FICHERO EN LA BASE DE DATOS(FICHERO projects);
module.exports = mongoose.model('projects',projectSchema);