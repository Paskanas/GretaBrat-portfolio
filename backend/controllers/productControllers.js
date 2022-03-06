import expressAsyncHandler from 'express-async-handler'
import {
  SHOW_PRODUCTS_HOME_SCREEN,
  SHOW_PRODUCTS_PRODUCTLIST_SCREEN,
} from '../constants/screensConstants.js'
import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public route
const getProducts = expressAsyncHandler(async (req, res) => {
  const pageSize = req.query.isAdmin
    ? SHOW_PRODUCTS_PRODUCTLIST_SCREEN
    : SHOW_PRODUCTS_HOME_SCREEN
  console.log(req)
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public route
const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private route/Admin
const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Create product
// @route POST /api/products
// @access Private route/Admin
const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Enter name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    bigImage: '/images/bigSample.jpg',
    brand: 'GretaBrat',
    category: 'Enter category',
    description: 'Enter description',
    countInStock: 0,
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc Update product
// @route PUT /api/products/:id
// @access Private route/Admin
const updateProduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    brand,
    image,
    bigImage,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.brand = brand
    product.image = image
    product.bigImage = bigImage
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not foud')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
