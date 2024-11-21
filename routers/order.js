import express from "express";
import {sendOrder} from "../producers/order.js"

const router = express.Router();

router.post("/", async(req, res) => {
    await sendOrder(req.body);
    res.sendStatus(200)
})

export default router;
