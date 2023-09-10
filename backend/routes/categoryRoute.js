// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
// const categoryController = require('../controllers/categoryController');
const {createCategory,createSubcategory} = require("../controllers/categoryController")

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");




// router.post('/create', categoryController.createCategory);
router.route('/create').post(isAuthenticatedUser, authorizeRoles("admin"),createCategory)
// router.post('/create-subcategory', categoryController.createSubcategory);
router.route('/create-subcategory').post(isAuthenticatedUser,authorizeRoles("admin"),createSubcategory)

module.exports = router;
