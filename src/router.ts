import * as express from 'express';
import * as path from 'path';
//import { router as users } from './user/users.route';
//import { router as rides } from './ride/rides.route';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

export function getRoutes(app: express.Express) {
  app.use('/', router);
  //app.use('/users', users);
  //app.use('/rides', rides);
}
