const express = require('express');
const router = express.Router();

const { createSubCategory  ,getSubcategories, updateSubcategory} = require("../controllers/subcategoryController")
const {deleteSubcategory} = require("../controllers/subcategoryController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.route('/create-subcategory').post(isAuthenticatedUser, createSubCategory)
router.route('/deleteSubcategory/:id').delete(isAuthenticatedUser, deleteSubcategory)

router.route(`/subcategory/:category_id`).get(getSubcategories)

router.route("/updatesubcategory/:id").put(isAuthenticatedUser,updateSubcategory)

module.exports = router;