# Application Manager

A system for managing students applications

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
npm
Node.js
Angular 7
Docker
```

### Get the code

```
$ git clone https://github.com/Delyan-Damyanov/angular7-crud.git
$ cd angular7-crud
$ npm install
```

### Run the API

Inside `API` folder open either `cmd` or `PowerShell`. То run the database:
```
docker-compose up
```
To run the API open new terminal window:
```
npm ci
```
followed by:
```
npm start
```
Should see message `"Connection Successful"`.

### Run the app

Run `npm ci` to install `node_modules`. Run `ng serve -o` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Built With

* [npm](https://www.npmjs.com/)
* [Node.js](https://nodejs.org/en/)
* [Angular 7](https://angular.io/)
