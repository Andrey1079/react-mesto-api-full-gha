const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlPattern = require('../utils/constants');
// prettier-ignore
const {
  getCards, createCard, deleteCard, setLike, deleteLike,
} = require('../controllers/cards');

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(urlPattern),
    }),
  }),
  createCard,
);
router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({ cardId: Joi.string().length(24).hex().required() }),
  }),
  deleteCard,
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({ cardId: Joi.string().length(24).hex().required() }),
  }),
  setLike,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({ cardId: Joi.string().length(24).hex().required() }),
  }),
  deleteLike,
);

module.exports = router;
