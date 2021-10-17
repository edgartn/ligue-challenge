const { developer } = require('../models');
class developerController{
    
    async listAllDevelopers(req, res) {

        const dev = await developer.findAll();

        res.status(200).send(dev);
    }
    
    async findByFilter(req, res) {

        const { name, sex, age, hobby, birthdate, page, limit } = req.query;

        console.log(name, sex, age, hobby, birthdate)

        const getOffset = (page, limit) => {
            return (page * limit) - limit;
        }

        const options = {
            where: {},
            attributes: [
                'id',
                'name',
                'sex',
                'age',
                'hobby',
                'birthdate'
            ],
            limit:{},
            offset:{}
        };
        
        if (name !== undefined)
            options.where.name = name;
        if (sex !== undefined)
            options.where.sex = sex;
        if (age !== undefined)
            options.where.age = age;
        if (hobby !== undefined)
            options.where.hobby = hobby;
        if (birthdate !== undefined)
            options.where.birthdate = birthdate;
        
        options.limit = limit || 1000;
        options.offset = getOffset(page, limit) || 0;

        const dev = await developer.findAll(options);

        res.status(200).send(dev);
    }

    async findById(req, res) {

        const { id } = req.params;

        const dev = await developer.findByPk(id);

        res.status(200).send(dev);
    }

    async createDeveloper(req, res) {

        const { name, sex, age, hobby, birthdate } = req.body;
        
        if (name == null || sex == null)
            res.status(400).send({message: 'the fields name and sex cannot be null'});

        developer.create({
            name: name, 
            sex: sex,
            age: age, 
            hobby: hobby, 
            birthdate:  birthdate
        }).then(function(developer) {
            res.status(201).send({
                message: 'Developer added successfully!',
                body: {
                    developer: { name, sex, age, hobby, birthdate },
                },
            });
        }).catch(function (err) {
            //console.log(err)
            res.status(400).send({
                'error': 'error to create a developer'
            });
        });

    };

    async updateDeveloper(req, res) {
        
        const { id } = req.params;
        const { name, sex, age, hobby, birthdate } = req.body;

        developer.update({
            name: name, 
            sex: sex,
            age: age, 
            hobby: hobby, 
            birthdate:  birthdate },
            { where: { id: id } }
        )

        res.status(200).send({ 
            message: 'Developer updated successfully!', 
            id: parseInt(id) 
        });
    }

    async deleteDeveloper(req, res) {
        
        const { id } = req.params;
        
        await developer.destroy({
            where: {
                id: id
            }
        })

        res.status(200).send({ 
            message: 'Developer deleted successfully!', 
            id : parseInt(id)
        });
        
    }

};

module.exports = new developerController();