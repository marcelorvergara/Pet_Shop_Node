import express from "express";
import ProprietarioController from "../controllers/proprietario.controller";

const router = express.Router();

router.post("/", ProprietarioController.insertProprietario);
router.put("/", ProprietarioController.updateProprietario);
router.delete("/:id", ProprietarioController.deleteProprietario);
router.get("/", ProprietarioController.getProprietarios);
router.get("/:id", ProprietarioController.getProprietario);

export default router;
