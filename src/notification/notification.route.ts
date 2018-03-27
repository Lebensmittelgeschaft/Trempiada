import * as express from 'express';
import { notificationController } from './notification.controller';
import { Notification } from './notification.model';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await notificationController.getAll());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const notification = await notificationController.getById(req.params.id);
    if (notification) {
      res.json(notification);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const notification = await notificationController.save(new Notification({
      user: req.body.user,
      content: req.body.content,
    }));

    if (notification) {
      res.json(notification);
    } else {
      res.sendStatus(400);
    }
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

    if (notification) {
      res.json(notification);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const notification = await notificationController.deleteById(req.params.id);
    if (notification) {
      res.json(notification);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
});

export { router as notificationRouter };
