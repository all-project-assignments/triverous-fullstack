const router = require('express').Router();
const orderController = require('../controllers/orderController')
const { loginCheck } = require("../middleware/auth")

router.get('/', orderController.getAllOrders)
router.get('/order-by-user/:userId', loginCheck, orderController.getOrderByUser) // order history for a user
router.post('/create-order', loginCheck, orderController.createOrder)
router.patch('/update-order/:orderId', orderController.updateOrder)
router.delete('/:orderId', orderController.deleteOrder)
router.get('/:orderId', orderController.getSingleOrder) 



module.exports = router;