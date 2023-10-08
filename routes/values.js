import express from "express";
import {
    electricityStatus,
    flowRate1,
    latestflowRate1,
    avgflowRate1,
    flowRate2,
    latestflowRate2,
    avgflowRate2,
    roEnable,
    totalFt101hr,
    totalFt102hr,
    getallusers,
} from "../controllers/getValues.js";

const router = express.Router();

router.post("/electricityStatus",electricityStatus)
router.post("/flowRate1",flowRate1)
router.post("/latestflowRate1",latestflowRate1)
router.post("/avgflowRate1",avgflowRate1)
router.post("/flowRate2",flowRate2)
router.post("/latestflowRate2",latestflowRate2)
router.post("/avgflowRate2",avgflowRate2)
router.post("/roEnable",roEnable)
router.post("/totalFt101hr",totalFt101hr)
router.post("/totalFt102hr",totalFt102hr)
router.post("/allusers",getallusers)

export default router;