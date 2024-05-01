const { Meetup } = require('../../db/models');

async function checkCreator(req, res, next) {
  const { id } = req.params;
  const userId = res.locals.user.id;
  const targetMeetup = await Meetup.findByPk(id);
  if (targetMeetup && targetMeetup?.userId === userId) return next();
  return res.sendStatus(403);
}

module.exports = checkCreator;
