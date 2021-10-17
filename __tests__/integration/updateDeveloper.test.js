const request = require('supertest');

const app = require('../../src/app');
const { developer } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('Update a created Developer', () => {
    beforeEach(async () => {
        await truncate();
    })

    it('should update a developer', async () => {

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

        const createdId = response.body[0].id

        const responseUpdate = await request(app)
            .put('/developers/' + createdId)
            .send({
                name: 'Carlos',
             })

        const { message, id }  = responseUpdate.body;
      
        expect(responseUpdate.status).toBe(200);

        expect(message).toBe('Developer updated successfully!');
        expect(id).toBe(createdId);

        const responseByFilter = await request(app)
            .get('/developers/filter?name=' + 'Carlos')

        expect(responseByFilter.status).toBe(200);

        expect(responseByFilter.body[0].name).toBe('Carlos');
        expect(responseByFilter.body[0].sex).toBe('M');
        expect(responseByFilter.body[0].age).toBe(22);
        expect(responseByFilter.body[0].hobby).toBe('Surf');

    });

});