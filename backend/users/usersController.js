const pick = require('lodash/pick');
const knex = require('../plugins/knexConfig');

knex();

class Users {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await knex('users');

      users.forEach(user => {
        delete user.id;
        delete user.password;
        delete user.mail;
        delete user.phone;
      });

      res.json(users);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  // login user
  async login(req, res) {
    const name = req.body.name;
    const password = req.body.password;

    try {
      const user = await knex('users')
        .where({ name })
        .then(data => data[0]);

      if (!user) {
        res.status(200).send('Такого пользователя не существует');
      } else if (user && password === user.password) {
        res.json({
          token: "123",
        });
      } else {
        res.status(200).send('Не верный пароль');
      }
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  // create new user (registration)
  async createUser(req, res) {
    try {
      const data = pick(req.body, 'name', 'password', 'mail', 'phone');
      const [id] = await knex('users').insert(data).returning('id');

      res
        .header('Location', `${req.protocol}://${req.hostname}/api/users/${id}`)
        .sendStatus(201);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
}

module.exports = new Users();
