const router = require('express').Router();
const LinkController = require('./controller');
const IsAuthenticated = require('../common/middlewares/IsAuthenticated');
const CheckPermission = require('../common/middlewares/CheckPermission');

router.post('/', LinkController.createLink);
router.get('/:code', LinkController.getLink);

// Admin: voir tous les liens courts créés
router.get('/all', IsAuthenticated.check, CheckPermission.has('admin'), LinkController.getAllLinks);

module.exports = router;
