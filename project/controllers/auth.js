const User = require('../models/user');
const bcrypt = require('bcryptjs');
const errorResponse = require('../lib/responses/error');
const successResponse = require('../lib/responses/success');
const jwt = require('jsonwebtoken');

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
  login: async (req, res) => {
    try {
      /**
       * 1. Za logiranje primame email i password
       * 2. Treba da proverime dali postoi korisnik so dadeniot email
       * 3.1 Dokolku ne postoi, vrati nekakov response so greska
       * 3.2 Dokolku postoi, odi na cekor 4
       * 4. Proveri dali ponudeniot password (od request-ot) e ist so onoj na najdeniot korisnik
       * 4.1 Dokolku ne se isti, vrakjame greska
       * 4.2 Dokolku se isti, generirame token
       * 5. Tokenot generiran vo minatiot cekor, go vrakjame vo response
       */
      const user = await User.findOne({ email: req.body.email })

      if (!user) {
        return errorResponse(res, 400, new Error('Bad request. Email not registered.'));
      }

      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return errorResponse(res, 400, new Error('Bad request. Passwords do not match.'));
      }

      const payload = {
        id: user._id,
        email: user.email
      }

      const token = jwt.sign(payload, 'nikola123', {
        expiresIn: '100m'
      });

      successResponse(res, 'JWT successfully generated', token);
    } catch (error) {
      errorResponse(res, 500, error);
    }
  },
  refreshToken: (req, res) => {
    try {
      const payload = {
        id: req.user.id,
        email: req.user.email
      }

      const token = jwt.sign(payload, 'nikola123', {
        expiresIn: '100m'
      });

      successResponse(res, 'JWT successfully refreshed', token);
    } catch (error) {
      errorResponse(res, 500, error);
    }
  }
};