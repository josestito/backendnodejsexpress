'use strict'
var Project = require('../Modelos/project.model');

var controller = {
    home: function(req,res){
        return res.status(200).send({
            message: 'soy la accion home del controlador'
        });
    },

    test: function(req,res){
        return res.status(200).send({
            message: 'soy la accion test del controlador'
        });
    },
    GuardarProyectos:function(req,res){
        //CREAMOS UN NUEVO OBJETO PROYECTO
        var project = new Project();
        //LE DAMOS LOS VALORES QUE VIENEN DESDE EL BODY
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;
        //GUARDAMOS EL PROYECTO EN LA BASE DE DATOS
        project.save()
        .then(projectStored => {
            //VALIDAMOS SI EL PROYECTO VIENE O NO EN LA PETICION
            if (!projectStored) {
                return res.status(404).send({ message: 'No se ha podido guardar el proyecto' });
            }
            //ENVIAMOS UN MENSAJE DE EXITO
            return res.status(200).send({ project: projectStored, message: 'Proyecto guardado correctamente' });
        })
        .catch(err => {
            console.error("Error al guardar el proyecto:", err);
            return res.status(500).send({ message: 'Error al guardar el proyecto', error: err });
        });
    },
    ObtenerProyectos: async function(req, res) {
        //capturamos el id que vine por la url
        var ProyectId = req.params.id;
        //validamos si el id viene vacio
        if (!ProyectId) {
            return res.status(404).send({ message: 'El proyecto no existe' });
        }

        try {
            //con nuestro modelo proyecto que ya esta enlazado al fichero projects de nuestra base de datos
            //lo buscamos por el id enviado por la url
            const element = await Project.findById(ProyectId);
            //validamos si encontro o no un proyecto en la base de datos
            if (!element) {
                return res.status(404).send({ message: 'El proyecto no existe' });
            }
            //en caso de que encuentre un proyecto, lo retorna
            return res.status(200).send({ element });
        } catch (err) {
            //validando mas errores xd
            return res.status(500).send({ message: 'Error al devolver los datos.' });
        }
    },
    ListarProyectos: async function(req, res) {
        try {
            //nos traemos todos los proyectos
            const projects = await Project.find({});
            //validamos si traemos o no proyectos.
            if (!projects.length) {
                return res.status(404).send({ message: 'No hay proyectos para mostrar' });
            }
            //retornamos todos los proyectos
            return res.status(200).send({ projects: projects });
        } catch (err) {
            return res.status(500).send({ message: 'Error al devolver los datos' });
        }
    }
};

module.exports = controller;