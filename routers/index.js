import express from "express"
import orderRouter from "./order.js"
import campaignRouter from "./campaign.js"
import notificationRouter from "./notification.js"

const router = express.Router()

router.use("/order", orderRouter)
router.use("/campaign", campaignRouter)
router.use("/notification", notificationRouter)

export default router
