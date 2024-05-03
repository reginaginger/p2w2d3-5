const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../configs/cookiesConfig');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body.email);
  const targetUser = await User.findOne({ where: { email } });
  if (!targetUser) return res.sendStatus(401);

  const isValid = await bcrypt.compare(password, targetUser.password);
  if (!isValid) return res.sendStatus(401);

  const user = targetUser.get();
  delete user.password;

  const { accessToken, refreshToken } = generateTokens({ user });

  res
    .cookie('refreshToken', refreshToken, cookiesConfig)
    .json({ accessToken, user });
});

authRouter.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  if (password.length < 3) return res.sendStatus(400);

  const hashpass = await bcrypt.hash(password, 10);
  const [newUser, created] = await User.findOrCreate({
    where: { email },
    defaults: { name, password: hashpass },
  });
  if (!created) return res.sendStatus(400);

  const user = newUser.get();
  delete user.password;

  const { accessToken, refreshToken } = generateTokens({ user });

  res
    .cookie('refreshToken', refreshToken, cookiesConfig)
    .json({ accessToken, user });
});

authRouter.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

authRouter.get('/users/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'Нет такого пользователя' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Упс!' });
  }
});

authRouter.put('/users/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const { adress } = req.body;
  try {
    const user = await User.findByPk(id);
    await user.update({ adress });
    res.json({ message: 'Данные изменены' });
  } catch (error) {
    res.status(500).json({ message: 'Нет такого пользователя' });
  }
});

module.exports = authRouter;
