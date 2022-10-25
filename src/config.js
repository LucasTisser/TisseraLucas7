import dotenv from "dotenv";
dotenv.config();

const config = {
  client: 'mysql',
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  }
};
// export const config = {
//   client: "sqlite3",
//   connection: {
//     filename: "../db/ecommerce.sqlite"
//   },
//   useNullAsDefault:true
// };

export default config