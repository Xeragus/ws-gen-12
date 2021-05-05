const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    /**
     * 1. Primame register request (full_name, email, password, confirmation_password)
     * 2. Proveruvame dali postoi korisnik so prateniot email
     *  2.1 Dokolku postoi, vrakjame response vo koj mu kazuvame na korisnikot deka email-ot e zafaten
     *  2.2 Dokolku ne postoi, prodolzuvame ponatamu so tocka 3
     * 3. Proveruvame dali password-ite se isti
     *  3.1 Dokolku ne se isti, vrakjame response vo koj mu kazuvame na korisnikot deka password-ite ne mu se sovpagjaat
     *  3.2 Dokolku se isti, prodolzuvame so cekor 4
     * 4. Go zacuvuvame User zapisot vo baza
     * 5. Vrakjame response vo koj mu kazuvame na korisnikot deka e uspesno registriran
     */
    try {
      let user = await User.findOne({ email: req.body.email });
      
      if (user) {
        return res.status(400).send({
          error: true,
          message: 'Bad request. Email is already in use'
        });
      }

      if (!req.body.password || req.body.password != req.body.confirmation_password) {
        return res.status(400).send({
          error: true,
          message: 'Bad request. Password does not exist or does not match the confirmation password.'
        });
      }

      req.body.password = bcrypt.hashSync(req.body.password);
      user = await User.create(req.body);

      res.status(201).send({
        error: false,
        message: 'You have successfully registered.'
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: error.message
      });
    }
  },
  login: (req, res) => {

  }
};