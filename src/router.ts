import * as express from 'express';
import * as path from 'path';
import { router as users } from './user/users.route';
import { router as rides } from './ride/rides.route';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../public/html/index.html'));
});

export function addRoute(app: express.Express): express.Router {
  app.use('/users', users);
  app.use('/rides', rides);

  return router;
}
