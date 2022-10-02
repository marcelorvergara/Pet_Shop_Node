import { IAnimal } from "../interfaces/IAnimal";
import AnimalRepository from "../repository/animal.repo";

async function insertAnimal(animal: IAnimal) {
  return await AnimalRepository.insertAnimal(animal);
}

async function updateAnimal(animal: IAnimal) {
  return await AnimalRepository.updateAnimal(animal);
}

async function deleteAnimal(id: number) {
  return await AnimalRepository.deleteAnimal(id);
}

async function getAnimais(proprietario_id?: string) {
  if (proprietario_id) {
    return await AnimalRepository.getAnimalByProprietario(proprietario_id);
  }
  return await AnimalRepository.getAnimais();
}

async function getAnimal(id: number) {
  return await AnimalRepository.getAnimal(id);
}

export default {
  insertAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimais,
  getAnimal,
};
