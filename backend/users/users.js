const express = require('express');
const pick = require('lodash/pick');
const router = express.Router();
const knex = require('../plugins/knexConfig');

knex();

router.get('/', async (req, res) => {
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
});

router.get('/login', async (req, res) => {
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
});

router.post('/create-user', async (req, res) => {
  try {
    const data = pick(req.body, 'name', 'password', 'mail', 'phone');
    const [id] = await knex('users').insert(data).returning('id');

    res
      .header('Location', `${req.protocol}://${req.hostname}/api/users/${id}`)
      .sendStatus(201);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

module.exports = router;
