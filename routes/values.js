import express from "express";
import {
    electrictyStatus,
    flowRate1,
    flowRate2,
    roEnable,
    totalFt101hr,
    totalFt102hr
} from "../controllers/getValues.js";

const router = express.Router();

router.post("/electricityStatus",electrictyStatus)
router.post("/flowRate1",flowRate1)
router.post("/flowRate2",flowRate2)
router.post("/roEnable",roEnable)
router.post("/totalFt101hr",totalFt101hr)
router.post("/totalFt102hr",totalFt102hr)

export default router;