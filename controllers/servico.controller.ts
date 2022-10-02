import { NextFunction, Request, Response } from "express";
import { IServico } from "../interfaces/IServico";
import ServicoService from "../services/servico.service";

async function insertServico(req: Request, res: Response, next: NextFunction) {
  try {
    let servico: IServico = req.body;
    if (!servico.descricao || !servico.valor || !servico.animal_id) {
      throw new Error("Descricao, valor e Id do animal são obrigatórios!");
    }
    servico = await ServicoService.insertServico(servico);
    res.send(servico);
    logger.info(`POST /servico - ${JSON.stringify(servico)}`);
  } catch (err) {
    next(err);
  }
}

async function updateServico(req: Request, res: Response, next: NextFunction) {
  let servico: IServico = req.body;
  try {
    if (
      !servico.servico_id ||
      !servico.descricao ||
      !servico.valor ||
      !servico.animal_id
    ) {
      throw new Error(
        "Id do serviço, descricao, valor e Id do animal são obrigatórios!"
      );
    }
    servico = await ServicoService.updateServico(servico);
    res.send(servico);
    logger.info(`PUT /servico - ${JSON.stringify(servico)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteServico(req: Request, res: Response, next: NextFunction) {
  try {
    await ServicoService.deleteServico(parseInt(req.params.id));
    res.end();
    logger.info(`DELETE /servico - id ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function getServicos(req: Request, res: Response, next: NextFunction) {
  try {
    res.send(
      await ServicoService.getServicos(req.query.proprietario_id?.toString())
    );
    logger.info("GET /servico");
  } catch (err) {
    next(err);
  }
}

async function getServico(req: Request, res: Response, next: NextFunction) {
  try {
    res.send(await ServicoService.getServico(parseInt(req.params.id)));
    logger.info(`GET /servico - id ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

export default {
  insertServico,
  updateServico,
  deleteServico,
  getServicos,
  getServico,
};
