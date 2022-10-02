import express from "express";
import ServicoController from "../controllers/servico.controller";

const router = express.Router();

router.post("/", ServicoController.insertServico);
router.put("/", ServicoController.updateServico);
router.delete("/:id", ServicoController.deleteServico);
router.get("/", ServicoController.getServicos);
router.get("/:id", ServicoController.getServico);

export default router;
