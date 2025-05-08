const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrder,
  updateOrder,
  createOrder,
  deleteOrder,
} = require("../controllers/Order");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, authorize("admin", "user"), getOrders)
  .post(protect, authorize("admin", "user"), createOrder);

router
  .route("/:id")
  .get(protect, authorize("admin", "user"), getOrder)
  .delete(protect, authorize("admin", "user"), deleteOrder)
  .put(protect, authorize("admin", "user"), updateOrder);

module.exports = router;
