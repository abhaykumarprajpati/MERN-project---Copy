// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
// const categoryController = require('../controllers/categoryController');
const { createCategory, createSubCategory, getAllCategories, updateCategory, getAllSubcategories, deletecategory, updatecategory } = require("../controllers/categoryController")
const { deleteSubcategory } = require('../controllers/subcategoryController')

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");




// router.post('/create', categoryController.createCategory);
router.route('/createCategory').post(isAuthenticatedUser, authorizeRoles("admin"), createCategory)
// router.post('/create-subcategory', categoryController.createSubcategory);
// router.route('/categories/:categoryId/subcategories').post(isAuthenticatedUser, authorizeRoles("admin"), createSubCategory)
router.route('/getAllCategories').get(getAllCategories)
router.route('/getAllsubCategories').get(getAllSubcategories)
// router.route('/categories/:categoryId').put(isAuthenticatedUser, updateCategory)
router.route("/deletecategory/:id").delete(isAuthenticatedUser,deletecategory)
router.route("/updatecategory/:id").put(isAuthenticatedUser,updatecategory)

module.exports = router;
