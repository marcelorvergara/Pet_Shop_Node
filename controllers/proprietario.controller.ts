import { NextFunction, Request, Response } from "express";
import { IProprietario } from "../interfaces/IProprietario";
import ProprietarioService from "../services/proprietario.service";

async function insertProprietario(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let proprietario: IProprietario = req.body;
    if (!proprietario.nome || !proprietario.telefone) {
      throw new Error("Nome e telefone são obrigatórios!");
    }
    proprietario = await ProprietarioService.insertProprietario(proprietario);
    res.send(proprietario);
    logger.info(`POST /proprietario - ${JSON.stringify(proprietario)}`);
  } catch (err) {
    next(err);
  }
}

async function updateProprietario(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let proprietario: IProprietario = req.body;
  try {
    if (
      !proprietario.proprietario_id ||
      !proprietario.nome ||
      !proprietario.telefone
    ) {
      throw new Error("Proprietario Id, Nome e telefone são obrigatórios");
    }
    proprietario = await ProprietarioService.updateProprietario(proprietario);
    res.send(proprietario);
    logger.info(`PUT /proprietario - ${JSON.stringify(proprietario)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteProprietario(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await ProprietarioService.deleteProprietario(parseInt(req.params.id));
    res.end();
    logger.info(`DELETE /proprietario - id ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function getProprietarios(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.send(await ProprietarioService.getProprietarios());
    logger.info("GET /proprietario");
  } catch (err) {
    next(err);
  }
}

async function getProprietario(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.send(
      await ProprietarioService.getProprietario(parseInt(req.params.id))
    );
    logger.info(`GET /proprietario - id ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

export default {
  insertProprietario,
  updateProprietario,
  deleteProprietario,
  getProprietarios,
  getProprietario,
};
