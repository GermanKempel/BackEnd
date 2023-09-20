import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Testing session', async () => {

  await mongoose.connect('mongodb+srv://GermanKempel:GcsLTjZBjYXUT5Ht@cluster0.tnbfe67.mongodb.net/testing?retryWrites=true&w=majority');

  let token;

  it('Debemos registrar un usuario correctamente', async () => {
    const userMock = {
      first_name: 'Coder',
      last_name: 'House',
      email: 'ch@gmail.com',
      age: 25,
      password: '1234'
    };

    const { statusCode, _body } = await requester
      .post('/api/sessions/register')
      .send(userMock);

    expect(statusCode).to.be.eql(200);
    expect(_body).to.be.ok;
  });

  it('Debemos loguear al usuario y retornar un token en el header', async () => {
    const credentialsMock = {
      email: 'ch@gmail.com',
      password: '1234'
    };

    const { statusCode, header } = await requester
      .post('/api/sessions/login')
      .send(credentialsMock);

    expect(statusCode).to.be.eql(200);
    expect(header).to.have.property('authorization');

    token = header.authorization.split(' ')[1];
  });

  it('Debemos enviar el token en el servicio current y entregar la información del usuario', async () => {
    const { _body } = await requester
      .get('/api/sessions/current')
      .set('Authorization', `Bearer ${token}`);

    expect(_body.payload.email).to.be.eql('ch@gmail.com');
  });
})