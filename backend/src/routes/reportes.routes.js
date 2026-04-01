import express from "express";
import { getReporte } from "../controllers/reportes.controller.js";

const router = express.Router();

router.get("/", getReporte);

export default router;
