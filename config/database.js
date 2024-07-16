// sequelize: ORM (Object Relational Mapper) for Node.js, it abstracts SQL queries into javascript objects and methods, making it easier to interact with the database

//using sequelize

let { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'aybiouss', '12345', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: console.log,
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully. -----------------------');
  })
  .catch(err => {
    console.error('Unable to connect to the database: ---------------------', err);
  });

// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

// (async() => {
//     await sequelize.sync();
//     console.log('DataBase & tables created !');
// })();

module.exports = sequelize;

// pg : PostgreSQL client for Node.js, it allows you to connect to a PostgreSQL database and perform queries
// USING PG
// const { Client } = require('pg');
// require('dotenv').config();
// const client = new Client({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     // database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });

// client.connect()
//     .then(() => console.log('Connect to PostgreSQL'))
//     .catch(err => console.error('Connection error', err.stack));

// const createDatabase = async (dbName) => {
//     await client.connect();
//     try {
//         await client.query(`CREATE DATABASE ${dbName}`);
//         console.log(`Database ${dbName} created successfully`);
//     } catch (err) {
//         if (err.code == '42P04')
//             console.log(`Database ${dbName} already exists`);
//         else
//             console.error(`Error creating database:`, err);
//     }
//     // finally {
//     //     await client.end();
//     // }
// }

// createDatabase(process.env.DB_DATABASE);

// const createTable = async () => {
//     const query = `
//         CREATE TABLE users (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL
//         );
//     `;
//     await client.query(query);
//     console.log('Table created');
// }

// const insertUser = async (username, password) => {
//     const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
//     await client.query(query, [username, password]);
//     console.log('User inserted');
// }

// const getUsers = async () => {
//     const res = await client.query('SELECT * FROM users');
//     console.log(res.rows);
// }

// const updateUser = async (id, newPassword) => {
//     const query = 'UPDATE users SET password = $1 WHERE id = $2';
//     await client.query(query, [newPassword, id]);
// }

// const deleteUser = async (id) => {
//     const query = 'DELETE FROM users WHERE id = $1';
//     await client.query(query, [id]);
// }
