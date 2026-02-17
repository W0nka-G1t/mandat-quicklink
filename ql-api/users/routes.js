const router = require('express').Router();
const UserController = require('./controller');
const { check } = require('../common/middlewares/IsAuthenticated');
const CheckPermission = require('../common/middlewares/CheckPermission');

router.get('/', check, UserController.getUser);
router.get('/all', check, CheckPermission.has('admin'), UserController.getAllUsers);
router.post('/update-role', check, CheckPermission.has('admin'), UserController.updateUserRole);
router.post('/delete', check, CheckPermission.has('admin'), UserController.deleteUser);

module.exports = router;