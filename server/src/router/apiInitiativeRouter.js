const express = require('express');
const { Initiative, Likes } = require('../../db/models');
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

initiativeRouter.route('/nonactive')
  .get(async (req, res) => {
    const initiatives = await Initiative.findAll({
      where: { status: false },
      order: [['createdAt', 'DESC']],
    });
    res.json(initiatives);
  });

initiativeRouter.post('/nonactive', async (req, res) => {
  const data = req.body;

  if (data.level === '') {
    const newInitiatives = await Initiative.findAll({
      where: {
        status: false,
        category: data.category,
      },
    });
    return res.json(newInitiatives);
  }

  if (data.category === '') {
    const newInitiatives = await Initiative.findAll({
      where: {
        status: false,
        level: data.level,
      },
    });
    return res.json(newInitiatives);
  }

  if (data) {
    const newInitiatives = await Initiative.findAll({
      where: {
        status: false,
        level: data.level,
        category: data.category,
      },
    });
    return res.json(newInitiatives);
  }
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

initiativeRouter.get('/likes/:id/user', verifyAccessToken, async (req, res) => {
  const { id } = req.params;

  const initiatives = await Likes.findAll({
    where: {
      userId: res.locals.user.id,
      initiativeId: id,
    },
  });
  res.json(initiatives);
});

initiativeRouter.post('/likes/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  await Likes.create({ userId: res.locals.user.id, initiativeId: id });
  res.sendStatus(201);
});

initiativeRouter.delete('/likes/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  await Likes.destroy({
    where: {
      userId: res.locals.user.id,
      initiativeId: id,
    },
  });
  res.sendStatus(204);
});

initiativeRouter.get('/likes/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const initiatives = await Likes.findAll({
    where: {
      initiativeId: id,
    },
  });
  res.json(initiatives);
});

initiativeRouter.post('/', async (req, res) => {
  const data = req.body;

  if (data.level === '') {
    const newInitiatives = await Initiative.findAll({
      where: {
        status: true,
        category: data.category,
      },
    });
    return res.json(newInitiatives);
  }
  if (data.category === '') {
    const newInitiatives = await Initiative.findAll({
      where: {
        status: true,
        level: data.level,
      },
    });
    return res.json(newInitiatives);
  }

  if (data) {
    const newInitiatives = await Initiative.findAll({
      where: {
        status: true,
        level: data.level,
        category: data.category,
      },
    });
    return res.json(newInitiatives);
  }
});

module.exports = initiativeRouter;
