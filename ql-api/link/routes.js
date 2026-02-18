const router = require('express').Router();
const LinkController = require('./controller');
const IsAuthenticated = require('../common/middlewares/IsAuthenticated');
const CheckPermission = require('../common/middlewares/CheckPermission');

router.post('/', LinkController.createLink);

// Admin: voir tous les liens courts créés
// IMPORTANT: This must come BEFORE /:code route to avoid conflict
router.get('/all', IsAuthenticated.check, CheckPermission.has('admin'), (req, res, next) => {
  console.log('Route /link/all hit - UserID:', req.user?.userId, 'Username:', req.user?.username);
  next();
}, LinkController.getAllLinks);

// User: voir ses propres liens
router.get('/my', IsAuthenticated.check, LinkController.getUserLinks);

router.get('/:code', LinkController.getLink);

module.exports = router;
