import express from "express";
import editRadioById from "../controllers/radios/editRadioById.js";
import getRadioById from "../controllers/radios/getRadioById.js";
import deleteRadioById from "../controllers/radios/deleteRadioById.js";
import getRadios from "../controllers/radios/getRadios.js";
import getRadioBySlug from "../controllers/radios/getRadioBySlug.js";
import createRadio from "../controllers/radios/createRadio.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", getRadios);
router.get("/id/:id", getRadioById);
router.get("/slug/:slug", getRadioBySlug);

//admin routes
router.post("/", adminMiddleware, createRadio);
router.put("/id/:id", adminMiddleware, editRadioById);
router.delete("/id/:id", adminMiddleware, deleteRadioById);

export default router;
