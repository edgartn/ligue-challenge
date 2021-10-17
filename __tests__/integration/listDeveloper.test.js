const request = require('supertest');

const app = require('../../src/app');
const { developer } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('List a created Developer', () => {
    beforeEach(async () => {
        await truncate();
    })

    it('should return a developer', async () => {

        await request(app)
            .post('/developers')
            .send({
                name: 'Marcos',
                sex: 'M',
                age: 22, 
                hobby: 'Surf', 
                birthdate:  new Date(2000, 1, 2)
            })

        const response = await request(app)
            .get('/developers')

        const  { name, sex, age, hobby }  = response.body[0];

        expect(response.status).toBe(200);

        expect(name).toBe('Marcos');
        expect(sex).toBe('M');
        expect(age).toBe(22);
        expect(hobby).toBe('Surf');

    });

    it('should return all developer created', async () => {

        await request(app)
            .post('/developers')
            .send({
                name: 'Marcos',
                sex: 'M',
                age: 22, 
                hobby: 'Surf', 
                birthdate:  new Date(2000, 1, 2)
            })

        await request(app)
            .post('/developers')
            .send({
                name: 'Andreia',
                sex: 'F',
                age: 32, 
                hobby: 'Music', 
                birthdate:  new Date(1980, 6, 22)
            })

        const response = await request(app)
            .get('/developers')

        expect(response.status).toBe(200);

        expect(response.body[0].name).toBe('Marcos');
        expect(response.body[0].sex).toBe('M');
        expect(response.body[0].age).toBe(22);
        expect(response.body[0].hobby).toBe('Surf');

        expect(response.body[1].name).toBe('Andreia');
        expect(response.body[1].sex).toBe('F');
        expect(response.body[1].age).toBe(32);
        expect(response.body[1].hobby).toBe('Music');

    });

    it('should return a developer by id', async () => {

        await request(app)
            .post('/developers')
            .send({
                name: 'Marcos',
                sex: 'M',
                age: 22, 
                hobby: 'Surf', 
                birthdate:  new Date(2000, 1, 2)
            })

        await request(app)
            .post('/developers')
            .send({
                name: 'Andreia',
                sex: 'F',
                age: 32, 
                hobby: 'Music', 
                birthdate:  new Date(1980, 6, 22)
            })

        const response = await request(app)
            .get('/developers')

        const responseById = await request(app)
            .get('/developers/' + response.body[1].id)

        expect(responseById.status).toBe(200);

        expect(responseById.body.name).toBe('Andreia');
        expect(responseById.body.sex).toBe('F');
        expect(responseById.body.age).toBe(32);
        expect(responseById.body.hobby).toBe('Music');

    }); 

    it('should`t return a developer using a id that not exists', async () => {

        await request(app)
            .post('/developers')
            .send({
                name: 'Marcos',
                sex: 'M',
                age: 22, 
                hobby: 'Surf', 
                birthdate:  new Date(2000, 1, 2)
            })

        await request(app)
            .post('/developers')
            .send({
                name: 'Andreia',
                sex: 'F',
                age: 32, 
                hobby: 'Music', 
                birthdate:  new Date(1980, 6, 22)
            })

        const responseById = await request(app)
            .get('/developers/' + 999999)

        expect(responseById.status).toBe(200);

        expect(responseById.body.name).toBe(undefined);

    });

    it('should return a developer using filter by name', async () => {

        await request(app)
            .post('/developers')
            .send({
                name: 'Marcos',
                sex: 'M',
                age: 22, 
                hobby: 'Surf', 
                birthdate:  new Date(2000, 1, 2)
            })

        await request(app)
            .post('/developers')
            .send({
                name: 'Andreia',
                sex: 'F',
                age: 32, 
                hobby: 'Music', 
                birthdate:  new Date(1980, 6, 22)
            })

        const responseByFilter = await request(app)
            .get('/developers/filter?name=' + 'Andreia')
       
        expect(responseByFilter.status).toBe(200);

        expect(responseByFilter.body[0].name).toBe('Andreia');
        expect(responseByFilter.body[0].sex).toBe('F');
        expect(responseByFilter.body[0].age).toBe(32);
        expect(responseByFilter.body[0].hobby).toBe('Music');

    });

});
