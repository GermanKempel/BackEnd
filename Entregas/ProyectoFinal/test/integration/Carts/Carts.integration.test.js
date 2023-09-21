import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing de carritos', async () => {

  it('GET de /carts debe devolver todos los carritos', async () => {
    const { statusCode, _body } = await requester.get('/api/carts');

    expect(statusCode).to.be.equal(200);
    expect(_body).to.have.property('carts');
  });

  it('POST de /carts debe crear un carrito correctamente', async () => {

    const cartMock = {
      timestamp: Date.now(),
      products: [
        {
          product: { _id: '64e432c7b929663d6c849fd3' }
          , quantity: 1
        },
      ],
      userId: { _id: '64a9b11ae41ab4fbd36807b7' }
    };
    const { statusCode, _body } = await requester
      .post('/api/carts')
      .send(cartMock);

    expect(statusCode).to.be.equal(200);
    expect(_body).to.be.ok

  });

});