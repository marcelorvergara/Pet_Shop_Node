import express from "express";
import AnimalController from "../controllers/animal.controller";

const router = express.Router();

router.post("/", AnimalController.insertAnimal);
router.put("/", AnimalController.updateAnimal);
router.delete("/:id", AnimalController.deleteAnimal);
router.get("/", AnimalController.getAnimais);
router.get("/:id", AnimalController.getAnimal);

export default router;
