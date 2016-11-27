# Reactjs demo with user authentication #

## Requirement ##
* [Nodejs](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/) - A package manager for build environment

## System Environment ##
* NODE_ENV (development、production)

## Quick Start ##
* npm install
* npm run dev - development
* npm run build - build to ../public/bundle.js

## Action Flow ##

### Vaild Token ###
>1. Auth -> Profile

### Invaild Token ###
>1. Auth -> Login -> Success -> Profile
>2. Auth -> Login -> Faild -> Login