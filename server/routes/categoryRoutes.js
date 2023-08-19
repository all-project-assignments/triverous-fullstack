const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
// const { loginCheck } = require('../middleware/auth');

router.get('/all-category', categoryController.getAllCategories);
router.post('/add-category',
    //  loginCheck,
    //  isAdmin,
   categoryController.addCategory)

router.patch('/:id',
    // loginCheck,
    // isAdmin,
    categoryController.editCategory    
    )
    
router.delete('/:id',
    // loginCheck,
    // isAdmin,
    categoryController.deleteCategory
)

module.exports = router;
