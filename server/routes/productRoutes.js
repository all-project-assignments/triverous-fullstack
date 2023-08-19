const router = require('express').Router();

const productController = require('../controllers/productController')

router.get('/', productController.getAllProducts); // list all products
router.get('/products-by-category/:categoryId', productController.getProductsByCategory);
// router.get('/products-by-price', productController.getProductsByPrice); // will depend on min and max from query

router.post('/add-product', productController.addProduct)
router.patch('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)
router.get('/:id', productController.getProductById )




module.exports = router;