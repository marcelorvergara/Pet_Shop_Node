import { NextFunction, Request, Response } from "express";
import { IAnimal } from "../interfaces/IAnimal";
import AnimalService from "../services/animal.service";

async function insertAnimal(req: Request, res: Response, next: NextFunction) {
  try {
    let animal: IAnimal = req.body;
    if (!animal.nome || !animal.tipo || !animal.proprietario_id) {
      throw new Error("Nome, telefone e Id do proprietário são obrigatórios!");
    }
    animal = await AnimalService.insertAnimal(animal);
    res.send(animal);
    logger.info(`POST /animal - ${JSON.stringify(animal)}`);
  } catch (err) {
    next(err);
  }
}

async function updateAnimal(req: Request, res: Response, next: NextFunction) {
  let animal: IAnimal = req.body;
  try {
    if (
      !animal.animal_id ||
      !animal.nome ||
      !animal.tipo ||
      !animal.proprietario_id
    ) {
      throw new Error(
        "Animal Id, nome, telefone e Id do proprietário são obrigatórios"
      );
    }
    animal = await AnimalService.updateAnimal(animal);
    res.send(animal);
    logger.info(`PUT /animal - ${JSON.stringify(animal)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteAnimal(req: Request, res: Response, next: NextFunction) {
  try {
    await AnimalService.deleteAnimal(parseInt(req.params.id));
    res.end();
    logger.info(`DELETE /animal - id ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function getAnimais(req: Request, res: Response, next: NextFunction) {
  try {
    res.send(
      await AnimalService.getAnimais(req.query.proprietario_id?.toString())
    );
    logger.info("GET /client");
  } catch (err) {
    next(err);
  }
}

async function getAnimal(req: Request, res: Response, next: NextFunction) {
  try {
    res.send(await AnimalService.getAnimal(parseInt(req.params.id)));
    logger.info(`GET /animal - id ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

export default {
  insertAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimais,
  getAnimal,
};
