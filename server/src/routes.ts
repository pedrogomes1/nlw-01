import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import pointController from './controllers/PointsControllers'
import itemsController from './controllers/ItemsControllers'

import { celebrate, Joi } from 'celebrate'
const routes = Router();

const upload = multer(multerConfig);

routes.get('/items', itemsController.index)
routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);

routes.post('/points',
upload.single('image'),
celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.number().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    uf: Joi.string().required().max(2),
    items: Joi.string().required(),
  })
}, {
  abortEarly: false
}),
pointController.create);

export default routes;