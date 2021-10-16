const routes = require('express').Router();
const { developer } = require('./app/models');

developer.create({
    name: 'Edgar', 
    sex: 'M', 
    age: 39, 
    hobby: 'woodworking', 
    birthdate:  new Date(1982, 02, 20)
});

module.exports = routes;