import * as express from 'express';
import { notificationController } from './notification.controller';
import { Notification } from './notification.model';
const router = express.Router();

/**
 * GET /notification
 * Returns all unread notifications.
 */
router.get('/', async (req, res, next) => {
  try {
    return res.json(await notificationController.getAll());
  } catch (err) {
    next(err);
  }
});

/**
 * GET /notification/5ab755...
 * Returns a specific notification by id.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const notification = await notificationController.getById(req.params.id);
    return notification ? res.json(notification) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /notification
 * Creates a new notification in the database.
 */
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

/**
 * PUT /notification/5ab755...
 * Updates a notification's details by id.
 */
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

/**
 * PUT /notification/5ab755.../read
 * Marks a notification as read.
 */
router.put('/:id/read', async (req, res, next) => {
  try {
    const notification = await notificationController.markAsRead(req.params.id);
    return notification ? res.json(notification) : res.sendStatus(400);
  } catch (err) {
    next(err);
  }
});

export { router as notificationRouter };
