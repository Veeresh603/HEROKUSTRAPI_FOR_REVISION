'use strict';

module.exports = {
    settings: {
        cors: {
            origin: ['http://localhost:8000', 'http://localhost:1337', `http://192.168.29.36:1337` ,'https://certisured.com', 'https://dev-certisured.netlify.app', 'https://anastrapiatlas.herokuapp.com'],
            credentials: true
        }
    }
}