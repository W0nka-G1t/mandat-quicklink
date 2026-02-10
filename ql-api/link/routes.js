const router = require('express').Router();
const LinkController = require('./controller');

router.post('/', LinkController.createLink);
router.get('/:code', LinkController.getLink);

module.exports = router;
