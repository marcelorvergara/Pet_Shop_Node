import { IServico } from "../interfaces/IServico";
import ServicoRepository from "../repository/servico.repo";

async function insertServico(servico: IServico) {
  return await ServicoRepository.insertServico(servico);
}

async function updateServico(servico: IServico) {
  return await ServicoRepository.updateServico(servico);
}

async function deleteServico(id: number) {
  return await ServicoRepository.deleteServico(id);
}

async function getServicos(proprietario_id?: string) {
  if (proprietario_id) {
    return await ServicoRepository.getServicoByProprietario(proprietario_id);
  }
  return await ServicoRepository.getServicos();
}

async function getServico(id: number) {
  return await ServicoRepository.getServico(id);
}

export default {
  insertServico,
  updateServico,
  deleteServico,
  getServicos,
  getServico,
};
