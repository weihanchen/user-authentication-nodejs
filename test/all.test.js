global.__testBase = __dirname + '/';
let app = require('../run');
let userTest = require(__testBase + 'routes/users');
describe('API Testing', () => {
   userTest(app,'test','test','test');
})
