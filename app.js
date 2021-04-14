const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');

app.use(express.json());

mongoose.connect('mongodb://localhost/ws-gen-12', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});

app 
  .get('/users', async (req, res) => {
    const users = await User.find();

    res.send({
      error: false,
      message: 'List of all available users',
      users: users
    })
  })
  .post('/users', async (req, res) => {
    const user = await User.create(req.body);

    res.status(201).send({
      error: false,
      message: `Uspesno zacuvan korisnik so ime ${user.full_name} i email ${user.email}`
    });
  });

app.listen(3000, () => {
  console.log('App is started on port 3000...');
})
