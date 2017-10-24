# tagsi-2017
### TAGSI, Facultad de Ingeniería, UdelaR, 2017

##### Install Angular 2 (works with Node.js v8.1.4 and npm 5.4.1):
* npm install -g @angular/cli

##### Build and run app on local server (at ./bus-search/):
* npm install
* ng serve

#### Run Node.js frontend server locally (at ./frontend-server/) updating on changes with nodemon instead of node:
* npm install
* nodemon index.js

#### Load database dump as 'tagsi' database (under Linux); after this, the database should be accessible at localhost:27017/tagsi
* sudo service mongod start
* mongorestore --db tagsi ./lineasParadas.bson
