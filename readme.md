# Nodejs user authentication sample base on json web token #

[![Build Status](https://travis-ci.org/weihanchen/User_Authentication_Nodejs.svg?branch=master)](https://travis-ci.org/weihanchen/User_Authentication_Nodejs)
[![Dependency Status](https://david-dm.org/weihanchen/NodeJS_User_Authentication.svg)](https://david-dm.org/weihanchen/NodeJS_User_Authentication)
[![devDependencies Status](https://david-dm.org/weihanchen/NodeJS_User_Authentication/dev-status.svg)](https://david-dm.org/weihanchen/NodeJS_User_Authentication?type=dev)

A nodejs server api for user authentication
## Requirement ##
* [MongoDB](https://www.mongodb.com/) - Our Database v3.2
* [Expressjs](http://expressjs.com/zh-tw/) - API Server
* [Nodejs](https://nodejs.org/en/) - Backend Framework
* [NPM](https://www.npmjs.com/) - Package Management

## Install nodejs dependence packages ##
* npm install
* development mode - npm run dev
* production mode - npm run product

This is simple demo of user authentication、permissions and account registration, use node js、express、mongodb to complete.

## Config ##
>1. config/database.js - database and jwt secret configuration
>2. secret - jwt auth secret
>3. database - database connection

## Packages ##
>1. [Mongoose](http://mongoosejs.com/) - mongodb object modeling
>2. [Simple JWT](https://www.npmjs.com/package/jwt-simple) - token use
>3. [Morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js
>4. [moment](http://momentjs.com/docs/) - date parse
>5. [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs) - ecrypt password

## Step ##
>1. edit config/database.js - database connection and jwt secret
>2. edit config/initial.js - super admin account and role's permissions
>3. run api server - npm run dev
>4. post /api/initialize to create roles and super admin account
>5. post api/users - create new account
>6. post api/users/login - login and get jwt token then frontend can store this token to use other api
>7. use request header: {Authorization: (jwt token)} when use other api
>8. [read documentation to use api](#Documentation)

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
* npm run test


## To Do ##
* get user list
* edit role name
* add more test case for permissions
* add business logic extension framework document
* add frontend ui to run this sample
* add swagger ui