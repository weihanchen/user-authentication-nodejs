const supertest = require('supertest');
require('should');
module.exports = (app, username, displayName, password) => {
    const request = supertest(app);
    const initializeUrl = '/api/initialize';
    const usersUrl = '/api/users';
    const loginUrl = '/api/users/login';
    const logoutUrl = '/api/users/logout';
    const meUrl = '/api/users/me';
    describe('initialize...', () => {
        it('should response status 400 when initialize not ready', function(done) {
            request.post(usersUrl)
                .set('Content-Type', 'application/json')
                .send({
                    username: username,
                    displayName: displayName,
                    password: password,
                })
                .expect(400)
                .end(function(err, res) {
                    res.body.message.should.equal('please post /api/initialize');
                    done(err);
                });
        });


        it('should response status 200 when initialize', function(done) {
            request.post(initializeUrl)
                .expect(200)
                .end(function(err) {
                    done(err);
                });
        });
    });
    describe('signup...', () => {
        it('should response status 400 when property missing', function(done) {
            request.post(usersUrl)
                .set('Content-Type', 'application/json')
                .send({

                })
                .expect(400)
                .end(function(err) {
                    done(err);
                });
        });

        it('should response status 200 when signup', function(done) {
            request.post(usersUrl)
                .set('Content-Type', 'application/json')
                .send({
                    username: username,
                    displayName: displayName,
                    password: password,
                })
                .expect(200)
                .end(function(err) {
                    done(err);
                });
        });

        it('should response status 400 and response message contain username already exist. when sigup exist user', function(done) {
            request.post(usersUrl)
                .set('Content-Type', 'application/json')
                .send({
                    username: username,
                    displayName: displayName,
                    password: password,
                })
                .expect(400)
                .end(function(err, res) {
                    res.body.message.should.equal('username already exist.');
                    done(err);
                });
        });
    });

    describe('Login', () => {
        it('should response status 400 and message conatins User not found.', function(done) {
            request.post(loginUrl)
                .set('Content-Type', 'application/json')
                .send({
                    username: 'User Not Found',
                    password: 'User Not Found'
                })
                .expect(400)
                .end(function(err, res) {
                    res.body.message.should.equal('User not found.');
                    done(err);
                });
        });

        it('should response status 400 and message contains Wrong password.', function(done) {
            request.post(loginUrl)
                .set('Content-Type', 'application/json')
                .send({
                    username: username,
                    password: 'User Not Found'
                })
                .expect(400)
                .end(function(err, res) {
                    res.body.message.should.equal('Wrong password.');
                    done(err);
                });
        });
    });

    describe('Logout', () => {
        let token;
        let userid;
        before((done) => {
            request.post(loginUrl)
                .set('Content-Type', 'application/json')
                .send({
                    username: username,
                    password: password
                })
                .expect(200)
                .end(function(err, res) {
                    token = res.body.token;
                    userid = res.body.uid;
                    done(err);
                });
        });

        it('should response status 401 when not send with token', function(done) {
            request.post(logoutUrl)
                .expect(401)
                .end(function(err) {
                    done(err);
                });
        });

        it('should response 200 and contains Successful Logout.', function(done) {
            request.post(logoutUrl)
                .set('Authorization', token)
                .expect(200)
                .end(function(err, res) {
                    res.body.message.should.equal('Successful Logout.');
                    done(err);
                });
        });

        it('should response status 401 when delete user after logout', function(done) {
            const resourceUrl = usersUrl + '/' + userid;
            request.delete(resourceUrl)
                .set('Authorization', token)
                .expect(401)
                .end(function(err) {
                    done(err);
                });
        });
    });

    describe('User Role Operation', () => {
        let token;
        let userid;
        let resourceUrl;
        before((done) => { //login and save token
            request.post(loginUrl)
                .set('Content-Type', 'application/json')
                .send({
                    username: username,
                    password: password
                })
                .expect(200)
                .end(function(err, res) {
                    token = res.body.token;
                    userid = res.body.uid;
                    resourceUrl = usersUrl + '/' + userid;
                    done(err);
                });

        });

        describe('get user info by users/me...', () => {
            it('should response status 401 when not send with token', function(done) {
                request.get(meUrl)
                    .expect(401)
                    .end(function(err) {
                        done(err);
                    });
            });
            it('should response status 200 and contains username、displayName when header has jwt token when get /users/me', function(done) {
                request.get(meUrl)
                    .set('Authorization', token)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.should.have.property('uid');
                        res.body.should.have.property('username');
                        res.body.should.have.property('displayName');
                        done(err);
                    });
            });
        });

        describe('get user info by users/:id', () => {
            it('should response 200 and contains uid、username、displayName、role', function(done) {
                request.get(resourceUrl)
                    .set('Authorization', token)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.should.have.property('uid');
                        res.body.should.have.property('username');
                        res.body.should.have.property('displayName');
                        res.body.should.have.property('role');
                        done(err);
                    });
            });
        });

        describe('edit user...', () => {
            // it('should response status 400 when update role', function(done) {
            //     request.put(resourceUrl)
            //         .set('Authorization', token)
            //         .send({
            //             roldId: $roldId
            //         })
            //         .expect(400)
            //         .end(function(err, res) {
            //             res.body.message.should.equal('cannot update role');
            //             done(err);
            //         })
            // })

            it('should user changed username and displayName status 200', function(done) {
                request.put(resourceUrl)
                    .set('Authorization', token)
                    .send({
                        username: 'test1',
                        displayName: 'test1'
                    })
                    .expect(200)
                    .end(function(err, res) {
                        res.body.username.should.equal('test1');
                        res.body.displayName.should.equal('test1');
                        done(err);
                    });
            });
        });

        describe('delete user...', () => {
            it('should response success when deleting user exist', function(done) {
                request.delete(resourceUrl)
                    .set('Authorization', token)
                    .expect(200)
                    .end(function(err, res) {
                        res.body.should.have.property('success');
                        res.body.success.should.equal(true);
                        done(err);
                    });
            });
            it('should response not found when user not exist', function(done) {
                request.delete(resourceUrl)
                    .set('Authorization', token)
                    .expect(404)
                    .end(function(err, res) {
                        res.body.message.should.equal('resource not found');
                        done(err);
                    });
            });
        });
    });
};
