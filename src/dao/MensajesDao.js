import knexLib from "knex";

export class MensajesDao {
  TABLE_NAME = "mensajes";
  ID_COLUMN = "id";

  constructor(config) {
    this.knex = knexLib(config);
  }

  async save(message) {
    try {
      let resultado = await this.knex(this.TABLE_NAME).insert(message);
      console.log(resultado);
      return resultado;
    } catch (err) {
      console.log(err);
    }
  }

  async Find(condition) {
    try {
      let messages = await this.knex(this.TABLE_NAME).where(condition);
      console.log(messages);
      return messages;
    } catch (err) {
      console.log(err);
    }
  }

  async ReadAll() {
    const messages = await this.knex("ecommerce").select("*");
    console.log(messages);
    return messages;
  }
}

export default MensajesDao;
