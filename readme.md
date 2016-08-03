# Nodejs user authentication sample base on json web token #
A nodejs server api for user authentication
## Requirement ##
* [MongoDB](https://www.mongodb.com/) - Our Database
* [Expressjs](http://expressjs.com/zh-tw/) - API Server
* [Nodejs](https://nodejs.org/en/) - Backend Framework
* [NPM](https://www.npmjs.com/) - Package Management

## Install nodejs dependence packages ##
>1. npm install
>2. node run.js 

This is simple demo of user authentication and account registration, use node js、express、mongodb to complete.

## Packages ##
>1. [Mongoose](http://mongoosejs.com/) - mongodb object modeling
>2. [Simple JWT](https://www.npmjs.com/package/jwt-simple) - token use
>3. [Morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js
>4. [moment](http://momentjs.com/docs/) - date parse

## Routing ##
* **api** - api root

* **api/users**

  ` post - create new user and password hash`


* **api/users/login**

	`post - login and get jwt token`

* **api/users/me**
	`get - get current user info`