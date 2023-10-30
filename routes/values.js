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
    sumflowrates,
    insertValues
} from "../controllers/getValues.js";

const router = express.Router();

router.post("/roEnable", roEnable)
router.post("/insertvalues", insertValues)
router.post("/flowRate2", flowRate2)
router.post("/flowRate1", flowRate1)
router.post("/allusers", getallusers)
router.post("/sumflowrates", sumflowrates)
router.post("/avgflowRate1", avgflowRate1)
router.post("/totalFt101hr", totalFt101hr)
router.post("/avgflowRate2", avgflowRate2)
router.post("/totalFt102hr", totalFt102hr)
router.post("/latestflowRate1", latestflowRate1)
router.post("/latestflowRate2", latestflowRate2)
router.post("/electricityStatus", electricityStatus)

export default router;