import * as repo from "./empresas.repository.js";
export async function listEmpresas() {
  return repo.findAll();
}