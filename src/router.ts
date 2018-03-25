import * as express from 'express';
import * as path from 'path';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

export { router as router };
