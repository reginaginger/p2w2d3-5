const express = require('express');
const { Meetup, User } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const checkCreator = require('../middlewares/checkCreator');

const meetupRouter = express.Router();

meetupRouter.route('/').get(async (req, res) => {
  const meetups = await Meetup.findAll({
    include: [User],
  });
  res.json(meetups);
}).post(verifyAccessToken, async (req, res) => {
  const newMeetup = await Meetup.create({ ...req.body, userId: res.locals.user.id });
  const meetWithUser = await Meetup.findByPk(newMeetup.id, { include: [User] });
  res.json(meetWithUser);
});

meetupRouter.get('/my', verifyAccessToken, async (req, res) => {
  const myMeetups = await Meetup.findAll({
    where: { userId: res.locals.user.id },
    include: User,
  });
  res.json(myMeetups);
});

meetupRouter.route('/:id')
  .get(async (req, res) => {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [User],
    });
    res.json(meetup);
  })
  .delete(verifyAccessToken, checkCreator, async (req, res) => {
    await Meetup.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(204);
  })
  .patch(verifyAccessToken, checkCreator, async (req, res) => {
    const meetup = await Meetup.findByPk(req.params.id);
    await meetup.update(req.body);
    res.json(meetup);
  });

module.exports = meetupRouter;
