// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
// const categoryController = require('../controllers/categoryController');
const { createCategory, createSubCategory, getAllCategories, updateCategory, deleteSubcategory } = require("../controllers/categoryController")

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");




// router.post('/create', categoryController.createCategory);
router.route('/createCategory').post(isAuthenticatedUser, authorizeRoles("admin"), createCategory)
// router.post('/create-subcategory', categoryController.createSubcategory);
// router.route('/categories/:categoryId/subcategories').post(isAuthenticatedUser, authorizeRoles("admin"), createSubCategory)
router.route('/deleteSubcategory').delete(isAuthenticatedUser,deleteSubcategory)
router.route('/getAllCategories').get(isAuthenticatedUser, getAllCategories)
router.route('/categories/:categoryId').put(isAuthenticatedUser, updateCategory)

module.exports = router;
