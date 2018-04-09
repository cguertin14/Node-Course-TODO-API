const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');

beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

describe('POSTS /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({ text })
            .type('urlencoded')
            .expect(201)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then(todos => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(e => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .type('urlencoded')
            .expect(400)
            .end((err,res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then(todos => {
                    expect(todos.length).toBe(0);
                    done()
                }).catch(e => done(e));
            });
    });
});