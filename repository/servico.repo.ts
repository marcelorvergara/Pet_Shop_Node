import { connect } from "./db";
import { IServico } from "../interfaces/IServico";

async function insertServico(servico: IServico) {
  console.log("respo");
  const conn = await connect();
  try {
    const sql =
      "INSERT INTO servicos (descricao, valor, animal_id) VALUES ($1, $2, $3) RETURNING *";
    const values = [servico.descricao, servico.valor, servico.animal_id];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function updateServico(servico: IServico) {
  const conn = await connect();
  try {
    const sql =
      "UPDATE servicos SET descricao = $1, valor = $2, animal_id = $3 WHERE servico_id = $4 RETURNING *";
    const values = [
      servico.descricao,
      servico.valor,
      servico.animal_id,
      servico.servico_id,
    ];
    const res = await conn.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function deleteServico(id: number) {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM servicos WHERE servico_id = $1", [id]);
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getServicos() {
  const conn = await connect();
  try {
    const res = await conn.query("SELECT * FROM servicos");
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getServico(id: number) {
  const conn = await connect();
  try {
    const res = await conn.query(
      "SELECT * FROM servicos WHERE servico_id = $1",
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

async function getServicoByProprietario(proprietario_id: string) {
  const conn = await connect();
  try {
    const res = await conn.query(
      "select s.servico_id, s.descricao, s.valor from servicos s inner join animais a on (s.animal_id = a.animal_id) where a.proprietario_id = $1",
      [proprietario_id]
    );
    return res.rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

export default {
  insertServico,
  updateServico,
  deleteServico,
  getServicos,
  getServico,
  getServicoByProprietario,
};
