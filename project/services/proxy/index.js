const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

require('dotenv').config()

app.use('/auth', proxy(
  `http://localhost:${process.env.AUTH_APP_PORT}`,
  {
    proxyReqPathResolver: (req) => {
      return `http://localhost:${process.env.AUTH_APP_PORT}/auth${req.url}`
    }
  }
));

app.use('/blogposts', proxy(
  `http://localhost:${process.env.BLOG_APP_PORT}`,
  {
    proxyReqPathResolver: (req) => {
      return `http://localhost:${process.env.BLOG_APP_PORT}/blogposts${req.url}`
    }
  }
));

app.use('/upload', proxy(
  `http://localhost:${process.env.UPLOAD_APP_PORT}`,
  {
    proxyReqPathResolver: (req) => {
      return `http://localhost:${process.env.UPLOAD_APP_PORT}/upload${req.url}`
    }
  }
));

const PORT = process.env.PORT || process.env.PROXY_SERVICE_PORT;
app.listen(PORT, err => {
  if(err) {
      return console.log('Could not start proxy service', err);
  }
  console.log(`Proxy service successfully started on port ${PORT}`);
});

// blog.heroku.com/auth/login ---> Reversed Proxy: site /auth
// ruti se se preprakjaat na localhost:3003/auth/login

//                          users (3000)       \
//                        /                     \
//                       /
// browser -> proxy (X) -- auth (3001)          -   DB
//                       \
//                        \                      /
//                          storage (3002)      /