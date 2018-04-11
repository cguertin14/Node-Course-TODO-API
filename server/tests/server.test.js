const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

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

                Todo.find({ text }).then(todos => {
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
                    expect(todos.length).toBe(4);
                    done()
                }).catch(e => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(4);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectId().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non-object ids', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        const hexId = todos[0]._id.toHexString(); 
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err,res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(hexId).then(todo => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch(e => done(e));
            });
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .delete(`/todos/${new ObjectId().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        let id = todos[0]._id.toHexString();
        let text = 'MIKE', completed = true;
        request(app)
            .patch(`/todos/${id}`)
            .type('urlencoded')
            .send({ text, completed })
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(text)
                expect(res.body.todo.completed).toBe(completed);
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        let id = todos[0]._id.toHexString();
        let text = 'WAZOW', completed = false;
        request(app)
            .patch(`/todos/${id}`)
            .type('urlencoded')
            .send({ text, completed })
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(text)
                expect(res.body.todo.completed).toBe(completed);
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done);
    });
});

describe('GET /users/me', () => {
    it('should return a user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('should return 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({ status: 'Invalid token.' });
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        let email = 'example@example.com';
        let password  = '123456';

        request(app)
            .post('/users')
            .type('urlencoded')
            .send({ email, password })
            .expect(201)
            .expect(res => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body.user._id).toBeTruthy();
                expect(res.body.user.email).toBe(email);
            })
            .end(err => {
                if (err) {
                    return done(err);
                }

                User.findOne({ email }).then(user => {
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(password);
                    done();
                })
            });
    });

    it('should return a validation errors if request is invalid', (done) => {
        let email = 'example.com';
        let password  = '123456';

        request(app)
            .post('/users')
            .type('urlencoded')
            .send({ email, password })
            .expect(400)
            .end(done);
    });

    it('should not create a user if email in use', (done) => {
        let email = users[0].email;
        let password  = '123456';

        request(app)
            .post('/users')
            .type('urlencoded')
            .send({ email, password })
            .expect(400)
            .end(done);
    });
});