const routes = require('express').Router();

const developerController = require('./app/controllers/developerController');

routes.get('/developers', developerController.listAllDevelopers);

routes.get('/developers/filter', developerController.findByFilter);

routes.get('/developers/:id', developerController.findById);

routes.post('/developers', developerController.createDeveloper);

routes.put('/developers/:id', developerController.updateDeveloper);

routes.delete('/developers/:id', developerController.deleteDeveloper);

module.exports = routes;