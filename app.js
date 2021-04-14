const express = require('express');
const app = express();

app.get('/hehe', (req, res) => {
  res.send({
    message: 'dojdovte na GET /hehe',
    hehe: true,
    haha: 1234,
    hihi: [1, 2, 3, 4]
  });
});

app.listen(3000, () => {
  console.log('App is started on port 3000...');
})

// <--------------------response------------------- server