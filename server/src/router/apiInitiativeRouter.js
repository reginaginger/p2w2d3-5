const express = require('express');
const { Initiative, User } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
// const checkCreator = require('../middlewares/checkCreator');

const initiativeRouter = express.Router();

initiativeRouter.route('/active').get(async (req, res) => {
  try {
    const initiatives = await Initiative.findAll({
      where: { status: true },
    });
    res.json(initiatives);
  } catch (e) {
    console.log(e);
    res.json([]);
  }
});
initiativeRouter.route('/nonactive').get(async (req, res) => {
  const initiatives = await Initiative.findAll({
    where: { status: false },
  });
  res.json(initiatives);
});

initiativeRouter.route('/new').post(verifyAccessToken, async (req, res) => {
  const newInitiative = await Initiative.create({ ...req.body, status: true, userId: res.locals.user.id });
  res.sendStatus(201);
});

// initiativeRouter.route('/account').get()

module.exports = initiativeRouter;
