const User = require('../models/user');
const successMessage = require('../lib/responses/success');
const errorMessage = require('../lib/responses/error');


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
        return errorMessage(res, 400, new Error('Bad request. Email is already in use'));
      }

      if (!req.body.password || req.body.password != req.body.confirmation_password) {
        return errorMessage(res, 400, 'Bad request. Password does not exist or does not match the confirmation password.')
      }

      user = await User.create(req.body);
      successMessage(res, 201, 'You have successfully registered.' )
    } catch (error) {
      errorMessage(res, 400, error)
    }
  },
  login: (req, res) => {

  }
};