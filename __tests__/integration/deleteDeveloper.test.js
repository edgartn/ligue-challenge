const request = require('supertest');

const app = require('../../src/app');
const { developer } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('Delete a created Developer', () => {
    beforeEach(async () => {
        await truncate();
    })

    it('should delete a developer', async () => {

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

        const responseList = await request(app)
            .get('/developers')

        const createdId = responseList.body[0].id

        const responseDelete = await request(app)
            .delete('/developers/' + createdId)

        const { message, id }  = responseDelete.body;

        expect(message).toBe('Developer deleted successfully!');
        expect(id).toBe(createdId);

    });

});
