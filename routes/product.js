const express = require('express')
const router = express.Router();
const {getProduct , getProducts , createProduct , deleteProduct , updateProduct} = require('../controllers/Product')

router.route('/').get(getProducts).post(createProduct)
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct)

module.exports = router;