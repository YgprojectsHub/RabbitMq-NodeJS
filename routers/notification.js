import express from "express";
import {sendNotification} from "../producers/notification.js"

const router = express.Router();

router.post("/", async(req, res) => {
    await sendNotification("order.payment.success", req.body);
    res.sendStatus(200)
})

export default router;
