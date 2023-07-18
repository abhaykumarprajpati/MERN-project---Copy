const express = require("express");

const { newOrder, myOrders, getAllOrders, updateOrder, deleteOrder, getSingleOrder, returnOrder, returnProduct } = require("../controllers/orderController");
const { getSingleUser } = require("../controllers/userController");
const router = express.Router();


const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")


router.route("/returnproduct").post(isAuthenticatedUser, returnProduct)
router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)

router.route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)





module.exports = router;
