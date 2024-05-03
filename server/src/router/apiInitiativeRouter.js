const express = require('express');
const { where } = require('sequelize');
const { Initiative, User } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const checkCreator = require('../middlewares/checkCreator');
// const checkCreator = require('../middlewares/checkCreator');

const initiativeRouter = express.Router();

initiativeRouter.route('/active').get(async (req, res) => {
  try {
    const initiatives = await Initiative.findAll({
      where: { status: true },
      order: [['createdAt', 'DESC']],
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
    order: [['createdAt', 'DESC']],
  });
  res.json(initiatives);
});

initiativeRouter.route('/new').post(verifyAccessToken, async (req, res) => {
  await Initiative.create({ ...req.body, status: true, userId: res.locals.user.id });
  res.sendStatus(201);
});

initiativeRouter.route('/:id')
  .get(async (req, res) => {
    const initiative = await Initiative.findByPk(req.params.id);
    res.json(initiative);
  })
  .put(verifyAccessToken, checkCreator, async (req, res) => {
    const { id } = req.params;
    await Initiative.update({ status: false }, { where: { id } });
    res.sendStatus(200);
  });

module.exports = initiativeRouter;
