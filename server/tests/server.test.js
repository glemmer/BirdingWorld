const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {User} = require('./../models/user');
const {users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);

describe('POST /users', () => {
    it('should create a new user', (done) => {
        var email = 'gert.lemmer@gmail.com';
        var password = 'GoFish10';
    
        request(app)
        .post('/users')
        .send({email,password})
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toBeTruthy();
            expect(res.body._id).toBeTruthy();
            expect(res.body.email).toBe(email);
        })
        .end((err) => {
             if(err) {
                return done(err);
             }
    
             User.findOne({email})
             .then((user) => {
                 expect(user).toBeTruthy();
                 expect(user.password).not.toBe(password);
                 done();               
             });   
        });
    });
    
    it('should return validation errors if request invalid', (done) => {
        request(app)
          .post('/users')
          .send({
            email: 'and',
            password: '123'
          })
          .expect(400)
          .end(done);
    });
    
    it('should not create user if email in use', (done) => {
        request(app)
          .post('/users')
          .send({
            email: users[0].email,
            password: 'Password123!'
          })
          .expect(400)
          .end(done);
    });
});

