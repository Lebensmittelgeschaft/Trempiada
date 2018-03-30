import * as express from 'express';
import { notificationController } from './notification.controller';
import { Notification } from './notification.model';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    return res.json(await notificationController.getAll());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const notification = await notificationController.getById(req.params.id);
    return notification ? res.json(notification) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const notification = await notificationController.create(new Notification({
      user: req.body.user,
      content: req.body.content,
    }));

    return notification ? res.json(notification) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const notification = await notificationController.updateById(req.params.id, {
      isRead: req.body.isRead,
      content: req.body.content,
    });

    return notification ? res.json(notification) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const notification = await notificationController.deleteById(req.params.id);
    return notification ? res.json(notification) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

export { router as notificationRouter };
