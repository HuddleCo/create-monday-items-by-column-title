import express from 'express';
import authorisationHandler from '../../middlewares/authorisation.handler';
import controller from './controller';

export default express
  .Router()
  .use(authorisationHandler)
  .post('/', controller.create);
