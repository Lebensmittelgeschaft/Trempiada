import * as express from 'express';
import * as path from 'path';
const router = express.Router();

function route() {

  /* GET home page. */
  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
  });

  return router;
}

export { route as router };
