const { developer } = require('../models');

class developerController{
    async listAllDevelopers(req, res) {

        const developer = await developer.findAll();

        return res.status(200).json(developer);
    }
}

module.exports = new developerController();