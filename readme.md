# Nodejs user authentication sample base on json web token #

[![Build Status](https://travis-ci.org/weihanchen/user-authentication-nodejs.svg?branch=master)](https://travis-ci.org/weihanchen/user-authentication-nodejs)
[![Coverage Status](https://coveralls.io/repos/github/weihanchen/user-authentication-nodejs/badge.svg?branch=master&bust=1)](https://coveralls.io/github/weihanchen/user-authentication-nodejs?branch=master)
[![Dependency Status](https://david-dm.org/weihanchen/user-authentication-nodejs.svg)](https://david-dm.org/weihanchen/user-authentication-nodejs)
[![devDependencies Status](https://david-dm.org/weihanchen/user-authentication-nodejs/dev-status.svg)](https://david-dm.org/weihanchen/user-authentication-nodejs?type=dev)

A nodejs server api for user authentication and use react to design frontend

## [Demo Site](https://user-authentication-nodejs.herokuapp.com/) ##

## Heroku Deployment ##

You can quickly setup a sample heroku application by clicking the button below.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Requirement ##
* [MongoDB](https://www.mongodb.com/) - Our Database v3.2
* [Expressjs](http://expressjs.com/zh-tw/) - API Server
* [Nodejs](https://nodejs.org/en/) - Backend Framework v7.1.0
* [NPM](https://www.npmjs.com/) - Package Management v3.10.9

## System Environment Variables ##
* `PORT`
* `SECRET_KEY`
* `MONGO_CONNECTION`


## Install dependence packages ##
```
$ cd server
$ npm install
$ cd ../client
$ npm install
```

## [client react documentation](client/readme.md) ##

## Config ##
* `server/config/database.js` database and jwt secret configuration, default using system variables
>1. secret - jwt auth secret
>2. database - database connection

## Packages ##
>1. [Mongoose](http://mongoosejs.com/) - mongodb object modeling
>2. [Simple JWT](https://www.npmjs.com/package/jwt-simple) - token use
>3. [Morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js
>4. [moment](http://momentjs.com/docs/) - date parse
>5. [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs) - ecrypt password

## Step ##
### General config
>1. edit server/config/database.js or system variable for `MONGO_CONNECTION`、`SECRET_KEY` - database connection and jwt secret
>2. edit server/config/initial.js - super admin account and role's permissions
>3. export `API_ENDPOINT` with system variable, allow client connection with server endpoint.
### Start with development
>1. server development: `npm run dev:server`
>2. client development: `npm run dev:client`, default port `8080`
### Production build and run
>1. `npm run build:client`
>2. `npm start`
### initial users and rols step
>1. post `/api/initialize` to create roles and super admin account
>2. post `api/users` - create new account
>3. post `api/users/login` - login and get jwt token then frontend can store this token to use other api
>4. use request header: `{Authorization: (jwt token)}` when use other api

## Authentication ##
Check token valid
* `/api/users/logout`

Check token valid and expired
* `/api/users/:id`
* `/api/users/me`

## Permissions(roles) ##
* admin
	* `delete` - other users and roles
	* `get` - all users and roles
	* `post` - user and role
	* `put` - all users and other user's role

* user
	* `delete` - self
	* `get` - self
	* `post` - signup
	* `put` - self but cannot update role

## Documentation ##

* request header - Authorization (json web token)

* **api** - api root

* **api/initialize**

  ` post - create roles and admin user`

* **api/users**

  ` post - create new user `


* **api/users/login**

	`post - login and get jwt token`

* **api/users/me**

	`get - get current user info`

* **api/users/:id**

	` delete - delete user `

	` get - get user info `

	` put - update username、displayName only superadmin can update other user's role`



## API Test ##
* npm install --dev
* npm run test:server


## To Do ##
- [ ] admin dashboard
- [ ] edit role name
- [ ] edit password
- [ ] add more test case for permissions
- [ ] add business logic extension framework document
- [ ] add swagger ui
