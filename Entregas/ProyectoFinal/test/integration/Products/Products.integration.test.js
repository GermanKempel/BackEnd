import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing de productos', async () => {

  let token;

  before(async () => {

    const credentialsMock = {
      email: 'gk@mail.com',
      password: '1234'
    }

    const { header } = await requester.post('/api/sessions/login').send(credentialsMock);
    token = header.authorization.split(' ')[1];
  });


  it('GET de /products debe devolver todos los productos', async () => {
    const { statusCode, _body } = await requester.get('/api/products');

    expect(statusCode).to.be.equal(200);
    expect(_body).to.have.property('products');
  });

});