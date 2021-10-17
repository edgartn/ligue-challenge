const request = require('supertest');

const app = require('../../src/app');
const { developer } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('Create a Developer', () => {
    beforeEach(async () => {
        await truncate();
    })

    it('should create a developer, using all fields', async () => {

        const response = await request(app)
            .post('/developers')
            .send({
                name: 'Marcos',
                sex: 'M',
                age: 22, 
                hobby: 'Surf', 
                birthdate:  new Date(2000, 1, 2)
             })

        const  { name, sex, age, hobby }  = response.body.body.developer;

        expect(response.status).toBe(201);

        expect(name).toBe('Marcos');
        expect(sex).toBe('M');
        expect(age).toBe(22);
        expect(hobby).toBe('Surf');

    });

    it('should create a developer only with required fields', async () => {

        const response = await request(app)
            .post('/developers')
            .send({
                name: 'Marcos',
                sex: 'M',
             })

        const  { name, sex, age, hobby }  = response.body.body.developer;

        expect(response.status).toBe(201);

        expect(name).toBe('Marcos');
        expect(sex).toBe('M');

    });

    it('shouldn`t create a developer without a name field', async () => {

        const response = await request(app)
            .post('/developers')
            .send({
                sex: 'M',
                age: 22, 
                hobby: 'Surf', 
                birthdate:  new Date(2000, 1, 2)
             })

        expect(response.body.message).toBe('the fields name and sex cannot be null')
        expect(response.status).toBe(400);

    }); 

});
