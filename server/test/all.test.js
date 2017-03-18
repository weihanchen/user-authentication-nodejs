global.__testBase = __dirname + '/';
const app = require('../run');
const userTest = require(__testBase + 'routes/users');
describe('API Testing', () => {
   userTest(app,'test','test','test');
});
