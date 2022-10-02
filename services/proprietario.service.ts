import { IProprietario } from "../interfaces/IProprietario";
import PropietarioRepository from "../repository/proprietario.repo";
import AnimalRepository from "../repository/animal.repo";

async function insertProprietario(proprietario: IProprietario) {
  return await PropietarioRepository.insertProprietario(proprietario);
}

async function updateProprietario(proprietario: IProprietario) {
  return await PropietarioRepository.updateProprietario(proprietario);
}

async function deleteProprietario(id: number) {
  const animal = await AnimalRepository.getAnimalByProprietario(id.toString());
  if (animal.length) {
    throw new Error(
      `Esse proprietário possui animal(ais) cadastrado(s) ${JSON.stringify(
        animal.map((f) => f.nome)
      )}`
    );
  } else {
    return await PropietarioRepository.deleteProprietario(id);
  }
}

async function getProprietarios() {
  return await PropietarioRepository.getProprietarios();
}

async function getProprietario(id: number) {
  return await PropietarioRepository.getProprietario(id);
}

export default {
  insertProprietario,
  updateProprietario,
  deleteProprietario,
  getProprietarios,
  getProprietario,
};
