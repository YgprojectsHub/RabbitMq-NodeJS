import express from "express";
import {sendCampaign} from "../producers/campaign.js"

const router = express.Router();

router.post("/", async(req, res) => {
    await sendCampaign(req.body);
    res.sendStatus(200)
})

export default router;
