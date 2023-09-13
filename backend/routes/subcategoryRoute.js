const express = require('express');
const router = express.Router();

const { createSubCategory  ,getSubcategories} = require("../controllers/subcategoryController")

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router.route('/create-subcategory').post(isAuthenticatedUser, createSubCategory)

router.route(`/subcategory/:category_id`).get(getSubcategories)



module.exports = router;