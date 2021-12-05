"use strict";

module.exports = {
  settings: {
    cors: {
      origin: [
        "http://localhost:8000",
        "http://localhost:1337",
        `http://192.168.29.36:1337`,
        "https://certisured.com",
        "https://dev-certisured.netlify.app",
        "https://anastrapiatlas.herokuapp.com",
        "https://certi3auth.netlify.app",
        process.env.ORIGIN_URL,
      ],
      credentials: true,
      "Access-Control-Allow-Headers" : "*",
      expose: ["WWW-Authenticate", "Server-Authorization"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
      headers: ["Content-Type", "Authorization", "X-Frame-Options", "Access-Control-Allow-Headers"]
    },
  },
};
