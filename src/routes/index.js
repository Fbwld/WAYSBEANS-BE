const express = require('express')
const {addUser,getUsers, getUser, updateUser, deleteUser} =require('../controllers/user')
const { register, login , checkAuth} = require('../controllers/auth')
const { Route } = require('express')
const { route } = require('express/lib/application')
const{auth} =require('../middlewares/auth')
const { uploadFile } = require('../middlewares/ulpoadFile')
const { addProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { addProfile, getProfile, deleteProfile, updateProfile, getProfiles } = require('../controllers/profile')
const { getCarts, deleteCart, getCart, addCart, updateCart } = require('../controllers/cart')
const { getTransactions, addTransaction } = require('../controllers/transaction')
require("dotenv").config()

const router = express.Router()

//import controllers
router.post('/user', addUser)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

router.post('/product',auth,uploadFile('image'),addProduct)
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.patch('/product/:id',auth,uploadFile('image'), updateProduct)
router.delete('/product/:id', deleteProduct)

router.patch('/profile/:id', uploadFile('image'), updateProfile)
router.delete('/profile/:id', deleteProfile)
router.get('/profiles', getProfiles)
router.get('/profile/:id', getProfile)
router.post('/profile', uploadFile('image'), addProfile)

router.get('/carts', auth, getCarts)
router.delete('/cart/:id',auth,  deleteCart)
router.get('/cart/:id', auth, getCart)
router.post('/cart', auth, addCart)
router.patch('/cart/:id', auth, updateCart)

router.get('/transactions', auth, getTransactions)
router.post('/transaction', auth, addTransaction);

router.post('/register', register)
router.post('/login', login)
router.get("/check-auth", auth, checkAuth);



module.exports= router